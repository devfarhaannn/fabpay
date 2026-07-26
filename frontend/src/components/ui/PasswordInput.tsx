import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const PasswordInput = ({
  label,
  placeholder,
  value,
  onChange,
  error,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

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
            error
              ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20"
          }
        `}
      >
        <Lock
          size={20}
          className="text-slate-400 dark:text-slate-500"
        />

        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
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
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            text-slate-500
            transition-colors
            duration-300

            hover:text-indigo-600

            dark:text-slate-400
            dark:hover:text-indigo-400
          "
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};