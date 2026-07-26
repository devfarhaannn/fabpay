import { useEffect, useMemo, useState } from "react";

import { DashboardLayout } from "../components/layout/DashboardLayout";

import { TransactionSearch } from "../components/transactions/TransactionSearch";
import { TransactionFilter } from "../components/transactions/TransactionFilter";
import { TransactionCard } from "../components/transactions/TransactionCard";
import { EmptyTransactions } from "../components/transactions/EmptyTransaction";

import { getTransactions } from "../services/transaction.service";

import type { Transaction } from "../types/transaction";

export const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "sent" | "received"
  >("all");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        `${transaction.otherUser.firstName} ${transaction.otherUser.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.otherUser.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : transaction.type.toLowerCase() === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  if (loading) {
    return (
      <DashboardLayout title="Transactions">
        <div className="py-20 text-center text-slate-500 dark:text-slate-400 transition-colors duration-300">
          Loading transactions...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Transactions">
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
            Transactions
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400 transition-colors duration-300">
            View your payment history.
          </p>
        </div>

        <TransactionSearch
          value={search}
          onChange={setSearch}
        />

        <TransactionFilter
          value={filter}
          onChange={setFilter}
        />

        {filteredTransactions.length === 0 ? (
          <EmptyTransactions />
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};