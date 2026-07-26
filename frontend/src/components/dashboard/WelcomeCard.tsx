import { motion } from "framer-motion";
import { HandCoins, ArrowRightLeft, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { APP_CONFIG } from "../../constants/config";
import { ROUTES } from "../../constants/routes";

interface WelcomeCardProps {
  firstName: string;
}

export const WelcomeCard = ({
  firstName,
}: WelcomeCardProps) => {
  const navigate = useNavigate();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 17
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex-1">

          <p className="text-slate-500 dark:text-slate-400">
            {greeting}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900 dark:text-slate-100">
            {firstName}
          </h2>

          <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
            {today}
          </p>

          <p className="mt-5 max-w-xl leading-7 text-slate-500 dark:text-slate-400">
            Welcome back to {APP_CONFIG.APP_NAME}. Manage your money securely,
            transfer instantly, and track every transaction from one place.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

            <button
              onClick={() => navigate(ROUTES.TRANSFER)}
              className="
                flex
                items-center
                gap-2

                rounded-xl

                bg-indigo-600

                px-5
                py-3

                font-semibold
                text-white

                transition-all
                duration-300

                hover:bg-indigo-700
              "
            >
              <ArrowRightLeft size={18} />

              Transfer Money
            </button>

            <button
              onClick={() => navigate(ROUTES.TRANSACTIONS)}
              className="
                flex
                items-center
                gap-2

                rounded-xl

                border
                border-slate-300

                bg-white

                px-5
                py-3

                font-semibold

                text-slate-700

                transition-all
                duration-300

                hover:bg-slate-100

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
                dark:hover:bg-slate-700
              "
            >
              <History size={18} />

              View History
            </button>

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <div
            className="
              rounded-3xl

              bg-indigo-100

              p-6

              transition-colors
              duration-300

              dark:bg-indigo-950/50
            "
          >
            <HandCoins
              size={64}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </div>

        </div>

      </div>
    </motion.div>
  );
};