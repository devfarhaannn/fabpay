import { ArrowRight, User2 } from "lucide-react";
import type { User } from "../../types/user";

import { Button } from "../ui/Button";
import { formatCurrency } from "../../utils/formatCurrency";

interface TransferSummaryProps {
  recipient: User | null;
  amount: number;
  note: string;
  loading: boolean;
  onTransfer: () => void;
}

export const TransferSummary = ({
  recipient,
  amount,
  note,
  loading,
  onTransfer,
}: TransferSummaryProps) => {
  const fee = 0;
  const total = amount + fee;

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
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Transfer Summary
      </h2>

      <div className="mt-6 space-y-5">

        {/* Recipient */}

        <div className="flex items-center justify-between">

          <span className="text-slate-500 dark:text-slate-400">
            Recipient
          </span>

          {recipient ? (
            <div className="flex items-center gap-2">

              <User2
                size={18}
                className="text-indigo-600 dark:text-indigo-400"
              />

              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {recipient.firstName} {recipient.lastName}
              </span>

            </div>
          ) : (
            <span className="text-slate-400 dark:text-slate-500">
              Not Selected
            </span>
          )}

        </div>

        {/* Amount */}

        <div className="flex items-center justify-between">

          <span className="text-slate-500 dark:text-slate-400">
            Amount
          </span>

          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {formatCurrency(amount)}
          </span>

        </div>

        {/* Fee */}

        <div className="flex items-center justify-between">

          <span className="text-slate-500 dark:text-slate-400">
            Transfer Fee
          </span>

          <span className="font-semibold text-green-600 dark:text-green-400">
            FREE
          </span>

        </div>

        {/* Note */}

        <div className="flex items-center justify-between">

          <span className="text-slate-500 dark:text-slate-400">
            Note
          </span>

          <span className="max-w-[180px] truncate font-medium text-slate-900 dark:text-slate-100">
            {note || "--"}
          </span>

        </div>

        <hr className="border-slate-200 dark:border-slate-700" />

        {/* Total */}

        <div className="flex items-center justify-between">

          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Total
          </span>

          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(total)}
          </span>

        </div>

      </div>

      <div className="mt-8">
        <Button
          type="button"
          loading={loading}
          onClick={onTransfer}
          label={
            loading
              ? "Processing..."
              : "Confirm Transfer"
          }
        />
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">

        <ArrowRight size={16} />

        <span>
          Secure transfer powered by FabPay
        </span>

      </div>

    </div>
  );
};