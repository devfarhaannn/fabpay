import {
  ArrowRightLeft,
  Wallet,
  History,
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

const actions = [
  {
    title: "Transfer",
    description: "Send money instantly",
    icon: ArrowRightLeft,
    color: "bg-indigo-600",
    route: ROUTES.TRANSFER,
  },
  {
    title: "Wallet",
    description: "View account balance",
    icon: Wallet,
    color: "bg-green-600",
    route: ROUTES.DASHBOARD,
  },
  {
    title: "History",
    description: "See recent transactions",
    icon: History,
    color: "bg-orange-600",
    route: ROUTES.TRANSACTIONS,
  },
  {
    title: "Profile",
    description: "Manage your profile",
    icon: User,
    color: "bg-purple-600",
    route: ROUTES.PROFILE,
  },
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        rounded-3xl

        border
        border-slate-200

        bg-white

        p-8

        shadow-lg

        transition-colors
        duration-300

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Quick Actions
      </h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => navigate(item.route)}
              className="
                rounded-2xl

                border
                border-slate-200

                bg-white

                p-5

                text-left

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-indigo-300
                hover:shadow-xl

                dark:border-slate-700
                dark:bg-slate-800
                dark:hover:border-indigo-500
                dark:hover:bg-slate-750
              "
            >
              <div
                className={`inline-flex rounded-xl p-4 ${item.color}`}
              >
                <Icon
                  className="text-white"
                  size={24}
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};