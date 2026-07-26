interface SpinnerProps {
  size?: number;
}

export const Spinner = ({
  size = 22,
}: SpinnerProps) => {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="
        animate-spin

        rounded-full

        border-4
        border-indigo-600
        border-t-transparent

        transition-colors
        duration-300
      "
    />
  );
};