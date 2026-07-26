import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { DashboardLayout } from "../components/layout/DashboardLayout";

import { SearchUser } from "../components/transfer/SearchUser";
import { RecipientCard } from "../components/transfer/RecipientCard";
import { AmountCard } from "../components/transfer/AmountCard";
import { TransferSummary } from "../components/transfer/TransferSummary";
import { SuccessModal } from "../components/transfer/SuccessModel";

import { transferMoney } from "../services/account.service";
import { useBalance } from "../hooks/useBalance";

import { ROUTES } from "../constants/routes";

import type { User } from "../types/user";
import type { ReceiptTransaction } from "../types/receipt";

export const Transfer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { refreshBalance } = useBalance();

  const [recipient, setRecipient] = useState<User | null>(
    location.state?.recipient ?? null
  );

  const [amount, setAmount] = useState(0);

  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [transaction, setTransaction] =
    useState<ReceiptTransaction | null>(null);

  const handleTransfer = async () => {
    if (!recipient) {
      toast.error("Please select a recipient.");
      return;
    }

    if (amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);

      const result = await transferMoney({
        receiverId: recipient.id,
        amount,
        note,
      });

      setTransaction(result.transaction);

      await refreshBalance();

      setShowSuccess(true);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Transfer failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);

    setTransaction(null);

    setRecipient(null);

    setAmount(0);

    setNote("");

    navigate(ROUTES.DASHBOARD, {
      replace: true,
    });
  };

  return (
    <>
      <DashboardLayout title="Transfer Money">
        <div className="space-y-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
              Transfer Money
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400 transition-colors duration-300">
              Send money securely to your contacts.
            </p>

          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="space-y-6 lg:col-span-2">

              {!recipient ? (
                <SearchUser
                  onSelect={setRecipient}
                />
              ) : (
                <>
                  <RecipientCard
                    user={recipient}
                    onChange={() =>
                      setRecipient(null)
                    }
                  />

                  <AmountCard
                    amount={amount}
                    setAmount={setAmount}
                    note={note}
                    setNote={setNote}
                    autoFocus={!!recipient}
                    onEnter={handleTransfer}
                  />
                </>
              )}

            </div>

            <TransferSummary
              recipient={recipient}
              amount={amount}
              note={note}
              loading={loading}
              onTransfer={handleTransfer}
            />

          </div>
        </div>
      </DashboardLayout>

      <SuccessModal
        open={showSuccess}
        transaction={transaction}
        onClose={handleCloseSuccess}
      />
    </>
  );
};