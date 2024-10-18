import cx from 'classnames';
import './grid.scss';

export const Grid = ({
  items,
  cols,
}: {
  items: JSX.Element[] | undefined;
  cols?: number;
}) => {
  const gridItems = items?.map((item, idx) => {
    return (
      <div className={`grid__item`} key={idx}>
        {item}
      </div>
    );
  });

  return (
    <div className={cx(`grid`, cols && `grid--cols-${cols}`)}>{gridItems}</div>
  );
};
