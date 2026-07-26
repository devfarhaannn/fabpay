interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({
  className = "",
}: SkeletonProps) => {
  return (
    <div
      className={`
        animate-pulse
        rounded-xl

        bg-slate-200
        dark:bg-slate-700

        transition-colors
        duration-300

        ${className}
      `}
    />
  );
};