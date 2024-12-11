import cx from 'classnames';
import styles from './grid.module.css';

export const Grid = ({
  items,
  cols,
}: {
  items: JSX.Element[] | undefined;
  cols?: number;
}) => {
  const gridItems = items?.map((item, idx) => {
    return (
      <div
        className={styles.item}
        style={{
          animationDelay: `${idx * 0.05}s`,
        }}
        key={idx}
      >
        {item}
      </div>
    );
  });

  return (
    <div className={cx(styles.root, cols && styles.cols)}>{gridItems}</div>
  );
};
