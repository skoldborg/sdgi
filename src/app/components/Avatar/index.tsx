import './avatar.scss';

export const Avatar = ({
  initials,
  onClick,
}: {
  initials: string;
  onClick: () => void;
}) => {
  return (
    <div className={`avatar`} onClick={onClick}>
      <span className={`avatar__initials`}>{initials}</span>
    </div>
  );
};
