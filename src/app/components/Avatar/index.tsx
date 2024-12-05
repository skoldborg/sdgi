export const Avatar = ({
  initials,
  onClick,
}: {
  initials: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="bg-gray text-black w-10 h-10 rounded-full flex justify-center items-center hover:bg-[#e4e4e4]"
      onClick={onClick}
    >
      <span className="font-bold pointer-events-none">{initials}</span>
    </button>
  );
};
