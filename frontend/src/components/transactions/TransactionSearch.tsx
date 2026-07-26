import { Search } from "lucide-react";

interface TransactionSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const TransactionSearch = ({
  value,
  onChange,
}: TransactionSearchProps) => {
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
      <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Search Transactions
      </h2>

      <div
        className="
          flex
          items-center

          rounded-xl

          border
          border-slate-300

          bg-white

          px-4
          py-3

          transition-all
          duration-300

          focus-within:border-indigo-600
          focus-within:ring-2
          focus-within:ring-indigo-500/20

          dark:border-slate-700
          dark:bg-slate-800
        "
      >
        <Search
          size={20}
          className="text-slate-400 dark:text-slate-500"
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name or email..."
          className="
            ml-3
            w-full

            bg-transparent

            text-slate-900
            placeholder:text-slate-400

            outline-none

            dark:text-slate-100
            dark:placeholder:text-slate-500
          "
        />
      </div>
    </div>
  );
};