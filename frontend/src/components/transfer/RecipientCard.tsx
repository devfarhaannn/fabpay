import { CheckCircle2 } from "lucide-react";

import type { User } from "../../types/user";

import { Avatar } from "../ui/Avatar";

interface RecipientCardProps {
  user: User;
  onChange: () => void;
}

export const RecipientCard = ({
  user,
  onChange,
}: RecipientCardProps) => {
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
      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Recipient
        </h2>

        <button
          onClick={onChange}
          className="
            text-sm
            font-semibold

            text-indigo-600

            transition-all
            duration-300

            hover:text-indigo-700

            dark:text-indigo-400
            dark:hover:text-indigo-300
          "
        >
          Change
        </button>

      </div>

      <div className="flex items-center gap-5">

        <Avatar
          name={`${user.firstName} ${user.lastName}`}
          size={60}
        />

        <div>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {user.firstName} {user.lastName}
          </h3>

          <p className="text-slate-500 dark:text-slate-400">
            {user.email}
          </p>

          <div className="mt-3 flex items-center gap-2 text-green-600 dark:text-green-400">

            <CheckCircle2 size={18} />

            <span className="font-medium">
              Verified User
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};