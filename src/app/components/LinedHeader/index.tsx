import './lined-header.scss';

export const LinedHeader = ({ headertitle }: { headertitle: string }) => {
  return (
    <div className="lined-header">
      <h2 className="lined-header__title">{headertitle}</h2>
    </div>
  );
};
