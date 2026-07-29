import type { ReactNode } from "react";

interface AuthFormProps {
  children: ReactNode;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void;
}

export const AuthForm = ({
  children,
  onSubmit,
}: AuthFormProps) => {
  return (
    <div
      className="
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white

        p-4
        sm:p-5
        md:p-6
        lg:p-7

        shadow-xl

        transition-all
        duration-300

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <form
        onSubmit={onSubmit}
        className="
          space-y-4
          sm:space-y-4
          lg:space-y-5
        "
      >
        {children}
      </form>
    </div>
  );
};