import { Loader2 } from "lucide-react";

interface ButtonProps {
  label: string;
  loading?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

export const Button = ({
  label,
  loading = false,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-2

        rounded-xl

        bg-gradient-to-r
        from-indigo-600
        to-violet-600

        py-4

        font-semibold
        text-white

        shadow-md

        transition-all
        duration-300

        hover:scale-[1.02]
        hover:shadow-xl

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-70

        focus:outline-none
        focus:ring-4
        focus:ring-indigo-300
        dark:focus:ring-indigo-800
      "
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {label}
    </button>
  );
};