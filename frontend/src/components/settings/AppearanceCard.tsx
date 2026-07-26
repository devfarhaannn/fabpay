import {
  Globe,
  Moon,
  Palette,
  Sun,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

export const AppearanceCard = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
        Appearance
      </h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-5 transition-colors duration-300 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-indigo-100 p-3 transition-colors duration-300 dark:bg-indigo-900/40">
              {theme === "dark" ? (
                <Moon className="text-indigo-400" size={22} />
              ) : (
                <Sun className="text-yellow-500" size={22} />
              )}
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Dark Mode
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Switch between light and dark appearance.
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className={`relative flex h-7 w-14 items-center rounded-full transition-all duration-300 ${
              theme === "dark"
                ? "bg-indigo-600"
                : "bg-slate-300"
            }`}
          >
            <div
              className={`h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${
                theme === "dark"
                  ? "translate-x-7"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-4 border-b border-slate-200 pb-5 transition-colors duration-300 dark:border-slate-700">
          <div className="rounded-xl bg-violet-100 p-3 transition-colors duration-300 dark:bg-violet-900/40">
            <Palette className="text-violet-600 dark:text-violet-400" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              Theme
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              FabPay automatically remembers your preference.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-100 p-3 transition-colors duration-300 dark:bg-green-900/40">
              <Globe className="text-green-600 dark:text-green-400" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Language
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                English (Default)
              </p>
            </div>
          </div>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 transition-colors duration-300 dark:bg-indigo-900/40 dark:text-indigo-300">
            English
          </span>
        </div>
      </div>
    </div>
  );
};