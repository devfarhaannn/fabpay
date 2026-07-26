interface TransactionFilterProps {
  value: "all" | "sent" | "received";
  onChange: (value: "all" | "sent" | "received") => void;
}

const filters = [
  "all",
  "sent",
  "received",
] as const;

export const TransactionFilter = ({
  value,
  onChange,
}: TransactionFilterProps) => {
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
        Filter
      </h2>

      <div className="flex flex-wrap gap-4">

        {filters.map((filter) => (

          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`
              rounded-xl

              px-6
              py-3

              font-semibold

              transition-all
              duration-300

              ${
                value === filter
                  ? "bg-indigo-600 text-white shadow-md"
                  : `
                      border
                      border-slate-200

                      bg-slate-100
                      text-slate-700

                      hover:bg-slate-200

                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-slate-200
                      dark:hover:bg-slate-700
                    `
              }
            `}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>

        ))}

      </div>

    </div>
  );
};