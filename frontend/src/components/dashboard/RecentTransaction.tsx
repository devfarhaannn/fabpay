import { useEffect, useState } from "react";

import {
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Avatar } from "../ui/Avatar";

import { ROUTES } from "../../constants/routes";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

import {
  getTransactions,
  type Transaction,
} from "../../services/transaction.service";

import { Skeleton } from "../common/Skeleton";

export const RecentTransactions = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();

        // Show only latest 5
        setTransactions(data.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-lg

        transition-colors
        duration-300

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Recent Transactions
        </h2>

        <button
          onClick={() => navigate(ROUTES.TRANSACTIONS)}
          className="
            text-sm
            font-semibold
            text-indigo-600
            transition
            hover:text-indigo-700

            dark:text-indigo-400
            dark:hover:text-indigo-300
          "
        >
          View All
        </button>

      </div>

      {loading ? (

        <div className="space-y-4">

          <Skeleton className="h-20 rounded-2xl dark:bg-slate-800" />

          <Skeleton className="h-20 rounded-2xl dark:bg-slate-800" />

          <Skeleton className="h-20 rounded-2xl dark:bg-slate-800" />

        </div>

      ) : transactions.length === 0 ? (

        <p className="py-8 text-center text-slate-500 dark:text-slate-400">
          No recent transactions.
        </p>

      ) : (

        <div className="space-y-4">

          {transactions.map((transaction) => {

            const isSent =
              transaction.type === "SENT";

            return (

              <div
                key={transaction.id}
                className="
                  flex
                  items-center
                  justify-between

                  rounded-2xl

                  border
                  border-slate-200

                  bg-white

                  p-4

                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:border-indigo-300
                  hover:bg-slate-50
                  hover:shadow-md

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:hover:border-indigo-500
                  dark:hover:bg-slate-700
                "
              >

                <div className="flex items-center gap-4">

                  <Avatar
                    name={`${transaction.otherUser.firstName} ${transaction.otherUser.lastName}`}
                    size={50}
                  />

                  <div>

                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {transaction.otherUser.firstName}{" "}
                      {transaction.otherUser.lastName}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">

                      {isSent ? (
                        <ArrowUpRight
                          size={16}
                          className="text-red-600 dark:text-red-400"
                        />
                      ) : (
                        <ArrowDownLeft
                          size={16}
                          className="text-green-600 dark:text-green-400"
                        />
                      )}

                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {formatDate(transaction.createdAt)}
                      </span>

                    </div>

                  </div>

                </div>

                <p
                  className={`text-lg font-bold ${
                    isSent
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {isSent ? "-" : "+"}
                  {formatCurrency(transaction.amount)}
                </p>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
};