import { useState } from "react";
import {
  Lock,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import { ChangePasswordModal } from "../settings/ChangePasswordModal";

export const SecurityCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
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
          Security
        </h2>

        <div className="space-y-5">

          {/* Password */}

          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-indigo-100 p-3 dark:bg-indigo-900/30">
                <Lock className="text-indigo-600 dark:text-indigo-400" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Password
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Change your account password anytime.
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="
                rounded-lg
                bg-indigo-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:bg-indigo-700
                hover:shadow-md
              "
            >
              Change
            </button>
          </div>

          {/* Two Factor Authentication */}

          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-green-100 p-3 dark:bg-green-900/30">
                <ShieldCheck className="text-green-600 dark:text-green-400" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Two-Factor Authentication
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Add an extra layer of security.
                </p>
              </div>
            </div>

            <span
              className="
                rounded-full
                bg-slate-100
                px-3
                py-1
                text-sm
                font-medium
                text-slate-700
                dark:bg-slate-800
                dark:text-slate-300
              "
            >
              Soon
            </span>
          </div>

          {/* Last Login */}

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-orange-100 p-3 dark:bg-orange-900/30">
              <Clock3 className="text-orange-600 dark:text-orange-400" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Last Login
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Today • 10:42 AM
              </p>
            </div>
          </div>

        </div>
      </div>

      <ChangePasswordModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};