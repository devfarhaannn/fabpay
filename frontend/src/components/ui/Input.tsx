import {
  Mail,
  User,
  Search,
  IndianRupee,
} from "lucide-react";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: "user" | "email" | "search" | "money";
  disabled?: boolean;
  readOnly?: boolean;
}

export const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon,
  disabled = false,
  readOnly = false,
}: InputProps) => {
  const getIcon = () => {
    switch (icon) {
      case "email":
        return Mail;
      case "search":
        return Search;
      case "money":
        return IndianRupee;
      default:
        return User;
    }
  };

  const Icon = getIcon();

  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <div
        className={`
          flex
          items-center
          rounded-xl
          border
          px-4
          transition-all
          duration-300

          ${
            disabled
              ? "bg-slate-100 dark:bg-slate-800"
              : "bg-white dark:bg-slate-800"
          }

          ${
            error
              ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
              : "border-slate-300 dark:border-slate-700 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20"
          }
        `}
      >
        <Icon
          size={20}
          className="text-slate-400 dark:text-slate-500"
        />

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            bg-transparent
            px-3
            py-4
            outline-none

            text-slate-900
            dark:text-slate-100

            placeholder:text-slate-400
            dark:placeholder:text-slate-500

            disabled:cursor-not-allowed
            disabled:text-slate-500
            dark:disabled:text-slate-400
          "
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};