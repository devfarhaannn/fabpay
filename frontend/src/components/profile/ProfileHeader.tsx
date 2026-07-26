import { Camera } from "lucide-react";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  email: string;
}

export const ProfileHeader = ({
  firstName,
  lastName,
  email,
}: ProfileHeaderProps) => {
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
      <div className="flex flex-col items-center">

        <div className="relative">

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-4xl font-bold text-white">

            {firstName.charAt(0)}

          </div>

          <button
            className="
              absolute
              bottom-0
              right-0

              rounded-full

              border
              border-slate-200

              bg-white

              p-2

              shadow-md

              transition-all
              duration-300

              hover:bg-slate-100

              dark:border-slate-700
              dark:bg-slate-800
              dark:hover:bg-slate-700
            "
          >
            <Camera
              size={18}
              className="text-slate-700 dark:text-slate-300"
            />
          </button>

        </div>

        <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-slate-100">

          {firstName} {lastName}

        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">

          {email}

        </p>

        <span
          className="
            mt-4

            rounded-full

            bg-indigo-100

            px-4
            py-2

            text-sm
            font-semibold

            text-indigo-700

            dark:bg-indigo-900/30
            dark:text-indigo-300
          "
        >

          ✔ Verified Account

        </span>

      </div>
    </div>
  );
};