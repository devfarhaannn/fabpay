interface AvatarProps {
  name: string;
  size?: number;
}

export const Avatar = ({
  name,
  size = 50,
}: AvatarProps) => {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="
        flex
        items-center
        justify-center

        rounded-full

        bg-gradient-to-r
        from-indigo-600
        to-violet-600

        font-bold
        text-white

        shadow-md

        transition-all
        duration-300
      "
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};