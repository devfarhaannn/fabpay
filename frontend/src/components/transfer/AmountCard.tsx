import { IndianRupee } from "lucide-react";
import { useEffect, useRef } from "react";

interface AmountCardProps {
  amount: number;
  setAmount: (amount: number) => void;
  note: string;
  setNote: (note: string) => void;
  autoFocus?: boolean;
  onEnter?: () => void;
}

const quickAmounts = [100, 500, 1000, 5000];

export const AmountCard = ({
  amount,
  setAmount,
  note,
  setNote,
  autoFocus = false,
  onEnter,
}: AmountCardProps) => {
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      amountRef.current?.focus();
    }
  }, [autoFocus]);

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
        Transfer Details
      </h2>

      {/* Amount */}

      <div className="mt-6">

        <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-300">
          Amount
        </label>

        <div
          className="
            flex
            items-center

            rounded-2xl

            border
            border-slate-300

            bg-white

            px-4
            py-3

            transition-all
            duration-300

            focus-within:border-indigo-500
            focus-within:ring-2
            focus-within:ring-indigo-500/20

            dark:border-slate-700
            dark:bg-slate-800
          "
        >
          <IndianRupee
            className="text-slate-500 dark:text-slate-400"
            size={22}
          />

          <input
            ref={amountRef}
            type="number"
            min={1}
            value={amount === 0 ? "" : amount}
            onChange={(e) =>
              setAmount(Number(e.target.value))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEnter?.();
              }
            }}
            placeholder="Enter amount"
            className="
              ml-2
              w-full

              bg-transparent

              text-2xl
              font-bold

              text-slate-900
              placeholder:text-slate-400

              outline-none

              dark:text-slate-100
              dark:placeholder:text-slate-500
            "
          />

        </div>

      </div>

      {/* Quick Amount */}

      <div className="mt-6">

        <p className="mb-3 font-semibold text-slate-700 dark:text-slate-300">
          Quick Amount
        </p>

        <div className="grid grid-cols-4 gap-3">

          {quickAmounts.map((item) => (

            <button
              key={item}
              type="button"
              onClick={() => setAmount(item)}
              className="
                rounded-xl

                border
                border-slate-200

                bg-white

                py-3

                font-medium

                transition-all
                duration-300

                hover:border-indigo-600
                hover:bg-indigo-50
                hover:text-indigo-700

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200
                dark:hover:border-indigo-500
                dark:hover:bg-indigo-900/30
                dark:hover:text-indigo-300
              "
            >
              ₹{item}
            </button>

          ))}

        </div>

      </div>

      {/* Note */}

      <div className="mt-6">

        <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-300">
          Note (Optional)
        </label>

        <textarea
          rows={3}
          value={note}
          onChange={(e) =>
            setNote(e.target.value)
          }
          placeholder="Dinner, Rent, Shopping..."
          className="
            w-full

            rounded-2xl

            border
            border-slate-300

            bg-white

            p-4

            text-slate-900
            placeholder:text-slate-400

            outline-none

            transition-all
            duration-300

            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-500/20

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-100
            dark:placeholder:text-slate-500
          "
        />

      </div>

    </div>
  );
};