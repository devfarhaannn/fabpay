import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const EmptyState = ({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
}: EmptyStateProps) => {
  return (
    <div
      className="
        rounded-3xl

        border
        border-slate-200

        bg-white

        p-10

        text-center

        shadow-lg

        transition-colors
        duration-300

        dark:border-slate-700
        dark:bg-slate-800
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center

          rounded-full

          bg-indigo-100

          dark:bg-indigo-900/30
        "
      >
        {icon}
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h2>

      <p className="mt-3 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="
            mt-8

            rounded-xl

            bg-indigo-600

            px-6
            py-3

            font-semibold
            text-white

            transition-all
            duration-300

            hover:bg-indigo-700
          "
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};