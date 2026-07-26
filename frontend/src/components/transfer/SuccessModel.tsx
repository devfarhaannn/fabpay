import {
  CheckCircle2,
  Copy,
  X,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";

import type { ReceiptTransaction } from "../../types/receipt";
import { generateReceipt } from "../../utils/generateReceipt";

interface SuccessModalProps {
  open: boolean;
  transaction: ReceiptTransaction | null;
  onClose: () => void;
}

export const SuccessModal = ({
  open,
  transaction,
  onClose,
}: SuccessModalProps) => {
  if (!open || !transaction) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(transaction.id);

    toast.success("Transaction ID copied.");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center">

        <div
          className="
            relative
            w-full
            max-w-md

            overflow-hidden

            rounded-3xl

            border
            border-slate-200

            bg-white

            shadow-2xl

            transition-colors
            duration-300

            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          {/* Close */}

          <button
            onClick={onClose}
            className="
              absolute
              right-5
              top-5
              z-10

              rounded-full
              p-2

              text-white

              transition-all
              duration-300

              hover:bg-white/20
            "
          >
            <X size={20} />
          </button>

          {/* Header */}

          <div className="rounded-t-3xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-8 text-center text-white">

            <CheckCircle2
              size={80}
              className="mx-auto"
            />

            <h2 className="mt-4 text-3xl font-bold">
              Payment Successful
            </h2>

            <p className="mt-2 text-green-100">
              Your transfer has been completed.
            </p>

          </div>

          {/* Body */}

          <div className="space-y-6 p-8">

            <div className="text-center">

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Amount Paid
              </p>

              <h1 className="mt-2 text-5xl font-bold text-slate-900 dark:text-slate-100">
                ₹
                {transaction.amount.toLocaleString("en-IN")}
              </h1>

            </div>

            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">

              <div className="flex justify-between">

                <span className="text-slate-500 dark:text-slate-400">
                  Recipient
                </span>

                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {transaction.receiver.firstName}{" "}
                  {transaction.receiver.lastName}
                </span>

              </div>

              <div className="mt-4 flex justify-between">

                <span className="text-slate-500 dark:text-slate-400">
                  Email
                </span>

                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {transaction.receiver.email}
                </span>

              </div>

              <div className="mt-4 flex justify-between">

                <span className="text-slate-500 dark:text-slate-400">
                  Status
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                  {transaction.status}
                </span>

              </div>

              <div className="mt-4 flex justify-between">

                <span className="text-slate-500 dark:text-slate-400">
                  Date
                </span>

                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {new Date(transaction.createdAt).toLocaleString("en-IN")}
                </span>

              </div>

              <div className="mt-4">

                <span className="text-slate-500 dark:text-slate-400">
                  Transaction ID
                </span>

                <div
                  className="
                    mt-2

                    flex
                    items-center
                    justify-between

                    rounded-xl

                    border
                    border-slate-200

                    bg-white

                    px-4
                    py-3

                    dark:border-slate-700
                    dark:bg-slate-900
                  "
                >

                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                    {transaction.id}
                  </p>

                  <button
                    onClick={handleCopy}
                    className="
                      rounded-lg
                      p-2

                      transition-all
                      duration-300

                      hover:bg-slate-100

                      dark:hover:bg-slate-700
                    "
                  >
                    <Copy
                      size={18}
                      className="text-slate-600 dark:text-slate-300"
                    />
                  </button>

                </div>

              </div>

              {transaction.note && (

                <div className="mt-4">

                  <span className="text-slate-500 dark:text-slate-400">
                    Note
                  </span>

                  <p className="mt-2 rounded-xl bg-white p-3 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                    {transaction.note}
                  </p>

                </div>

              )}

            </div>

            <div className="space-y-3">

              <button
                type="button"
                onClick={() => generateReceipt(transaction)}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  border
                  border-indigo-600

                  py-4

                  font-semibold

                  text-indigo-600

                  transition-all
                  duration-300

                  hover:bg-indigo-50

                  dark:text-indigo-400
                  dark:hover:bg-indigo-900/20
                "
              >
                <Download size={20} />

                Download Receipt
              </button>

              <button
                type="button"
                onClick={onClose}
                className="
                  w-full

                  rounded-xl

                  bg-indigo-600

                  py-4

                  text-lg
                  font-semibold
                  text-white

                  transition-all
                  duration-300

                  hover:bg-indigo-700
                "
              >
                Done
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};