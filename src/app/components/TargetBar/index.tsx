import cx from 'classnames';

export const TargetBar = ({
  title,
  description,
  imageUrl,
  size = 'large',
}: {
  title: string;
  description: string;
  imageUrl: string;
  size?: 'small' | 'large';
  imageWidth?: number;
  imageHeight?: number;
}) => {
  const classNames = cx(
    'flex',
    size === 'small' ? 'mb-6 last-child:mb-0' : 'mb-4',
    size && 'target-bar--' + size,
  );

  return (
    <div data-component="target-bar" className={classNames}>
      <figure
        className={cx(
          'flex-shrink-0 overflow-hidden m-0',
          size === 'small' ? 'w-[60px] h-[72px]' : 'w-[100px] h-[119px]',
        )}
      >
        <img src={imageUrl} alt="" className="mt-px block" />
      </figure>
      <div className={cx(size === 'small' ? 'pl-4' : 'pl-4 md:pl-5')}>
        <h3
          className={cx(
            'mb-3 ',
            size === 'small' ? 'text-lg' : 'text-lg md:text-2xl',
          )}
        >
          {title}
        </h3>
        <p
          className={cx(
            size === 'small' ? 'text-base' : 'text-base md:text-lg',
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
