import {
  IndianRupee,
  ArrowRightLeft,
  Users,
} from "lucide-react";

interface AccountStatsProps {
  balance: number;
  transactions: number;
  beneficiaries: number;
}

export const AccountStats = ({
  balance,
  transactions,
  beneficiaries,
}: AccountStatsProps) => {
  const stats = [
    {
      title: "Current Balance",
      value: `₹${balance.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color:
        "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      title: "Transactions",
      value: transactions,
      icon: ArrowRightLeft,
      color:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    },
    {
      title: "Beneficiaries",
      value: beneficiaries,
      icon: Users,
      color:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    },
  ];

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
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Account Statistics
      </h2>

      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                rounded-2xl

                border
                border-slate-200

                bg-white

                p-5

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:shadow-md

                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              <div
                className={`inline-flex rounded-xl p-3 ${stat.color}`}
              >
                <Icon size={24} />
              </div>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                {stat.title}
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stat.value}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};