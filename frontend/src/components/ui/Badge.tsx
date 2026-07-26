interface BadgeProps {
  text: string;
  color?: "green" | "red" | "orange" | "blue";
}

export const Badge = ({
  text,
  color = "blue",
}: BadgeProps) => {
  const colors = {
    green:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

    red:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

    orange:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",

    blue:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        transition-colors
        duration-300
        ${colors[color]}
      `}
    >
      {text}
    </span>
  );
};