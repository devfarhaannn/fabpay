import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EmptyTransactions = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        rounded-3xl

        border
        border-slate-200

        bg-white

        p-12

        text-center

        shadow-lg

        transition-colors
        duration-300

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div
        className="
          mx-auto
          flex
          h-24
          w-24
          items-center
          justify-center

          rounded-full

          bg-indigo-100

          dark:bg-indigo-900/30
        "
      >
        <CreditCard
          size={42}
          className="text-indigo-600 dark:text-indigo-400"
        />
      </div>

      <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
        No Transactions Yet
      </h2>

      <p className="mt-3 text-slate-500 dark:text-slate-400">
        You haven't made any transactions yet.
        Start by sending money to your friends or family.
      </p>

      <button
        onClick={() => navigate("/transfer")}
        className="
          mt-8

          rounded-xl

          bg-indigo-600

          px-8
          py-3

          font-semibold
          text-white

          transition-all
          duration-300

          hover:bg-indigo-700
        "
      >
        Make Your First Transfer
      </button>
    </div>
  );
};