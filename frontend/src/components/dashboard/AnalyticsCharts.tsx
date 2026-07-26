import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  getAnalytics,
  type Analytics,
} from "../../services/analytics.service";

import { Skeleton } from "../common/Skeleton";

const COLORS = [
  "#6366F1",
  "#22C55E",
];

export const AnalyticsCharts = () => {
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
      <div className="grid gap-6 lg:grid-cols-2">

        <Skeleton className="h-80 rounded-3xl dark:bg-slate-800" />

        <Skeleton className="h-80 rounded-3xl dark:bg-slate-800" />

        <Skeleton className="h-80 rounded-3xl lg:col-span-2 dark:bg-slate-800" />

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
          Analytics Charts
        </h2>

        <div className="py-16 text-center text-slate-500 dark:text-slate-400">
          Unable to load charts.
        </div>
      </div>
    );
  }

  const moneyFlow = [
    {
      name: "Wallet",
      Sent: analytics.totalSent,
      Received: analytics.totalReceived,
    },
  ];

  const pieData = [
    {
      name: "Sent",
      value: analytics.totalSent,
    },
    {
      name: "Received",
      value: analytics.totalReceived,
    },
  ];

  const transactionData = [
    {
      name: "Transactions",
      value: analytics.totalTransactions,
    },
    {
      name: "Beneficiaries",
      value: analytics.totalBeneficiaries,
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {/* Area Chart */}

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
          Money Flow
        </h2>

        <div className="h-72">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={moneyFlow}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Area
                type="monotone"
                dataKey="Sent"
                stroke="#6366F1"
                fill="#6366F1"
                fillOpacity={0.25}
              />

              <Area
                type="monotone"
                dataKey="Received"
                stroke="#22C55E"
                fill="#22C55E"
                fillOpacity={0.25}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Pie Chart */}

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
          Wallet Overview
        </h2>

        <div className="h-72">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

            {/* Bar Chart */}

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

          lg:col-span-2
        "
      >
        <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Statistics
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={transactionData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="value"
                fill="#6366F1"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};