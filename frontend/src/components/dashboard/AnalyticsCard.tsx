import { useEffect, useState } from "react";

import {
  ArrowUpRight,
  ArrowDownLeft,
  Activity,
  Users,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatCurrency";
import { Skeleton } from "../common/Skeleton";

import {
  getAnalytics,
  type Analytics,
} from "../../services/analytics.service";

export const AnalyticsCard = () => {
  const [analytics, setAnalytics] =
    useState<Analytics | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
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
        <Skeleton className="mb-6 h-8 w-40" />

        <div className="space-y-5">
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!analytics) {
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
          Analytics
        </h2>

        <div className="py-10 text-center text-slate-500 dark:text-slate-400">
          Failed to load analytics.
        </div>
      </div>
    );
  }

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
        Analytics
      </h2>

      <div className="space-y-5">

        {/* Total Sent */}

        <div
          className="
            flex
            items-center
            justify-between

            rounded-2xl

            bg-red-50

            p-4

            transition-colors
            duration-300

            dark:bg-red-950/30
          "
        >
          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-red-100 p-3 dark:bg-red-900/40">
              <ArrowUpRight
                size={22}
                className="text-red-600 dark:text-red-400"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Sent
              </p>

              <h3 className="font-bold text-red-600 dark:text-red-400">
                {formatCurrency(analytics.totalSent)}
              </h3>
            </div>

          </div>
        </div>

        {/* Total Received */}

        <div
          className="
            flex
            items-center
            justify-between

            rounded-2xl

            bg-green-50

            p-4

            transition-colors
            duration-300

            dark:bg-green-950/30
          "
        >
          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-green-100 p-3 dark:bg-green-900/40">
              <ArrowDownLeft
                size={22}
                className="text-green-600 dark:text-green-400"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Received
              </p>

              <h3 className="font-bold text-green-600 dark:text-green-400">
                {formatCurrency(analytics.totalReceived)}
              </h3>
            </div>

          </div>
        </div>

        {/* Transactions */}

        <div
          className="
            flex
            items-center
            justify-between

            rounded-2xl

            bg-slate-100

            p-4

            transition-colors
            duration-300

            dark:bg-slate-800
          "
        >
          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-slate-200 p-3 dark:bg-slate-700">
              <Activity
                size={22}
                className="text-slate-700 dark:text-slate-200"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Transactions
              </p>

              <h3 className="font-bold text-slate-900 dark:text-slate-100">
                {analytics.totalTransactions}
              </h3>
            </div>

          </div>
        </div>

        {/* Beneficiaries */}

        <div
          className="
            flex
            items-center
            justify-between

            rounded-2xl

            bg-indigo-50

            p-4

            transition-colors
            duration-300

            dark:bg-indigo-950/30
          "
        >
          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-indigo-100 p-3 dark:bg-indigo-900/40">
              <Users
                size={22}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Beneficiaries
              </p>

              <h3 className="font-bold text-indigo-600 dark:text-indigo-400">
                {analytics.totalBeneficiaries}
              </h3>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};