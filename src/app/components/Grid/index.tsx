import cx from 'classnames';
import styles from './grid.module.scss';

export const Grid = ({
  items,
  cols,
}: {
  items: JSX.Element[] | undefined;
  cols?: number;
}) => {
  const gridItems = items?.map((item, idx) => {
    return (
      <div className={styles.item} key={idx}>
        {item}
      </div>
    );
  });

  return (
    <div className={cx(styles.root, cols && styles.cols)}>{gridItems}</div>
  );
};
