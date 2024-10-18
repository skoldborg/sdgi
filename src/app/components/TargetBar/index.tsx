import './targetbar.scss';
import cx from 'classnames';
import Image from 'next/image';

export const TargetBar = ({
  title,
  description,
  imageUrl,
  size,
}: {
  title: string;
  description: string;
  imageUrl: string;
  size?: string;
}) => {
  const classNames = cx('target-bar', size && 'target-bar--' + size);

  return (
    <div className={classNames}>
      <figure className={`target-bar__icon`}>
        <Image
          src={imageUrl}
          alt=""
          className={`target-bar__icon-image`}
          width="100"
          height="155"
        />
      </figure>
      <div className={`target-bar__content`}>
        <h3 className={`target-bar__title`}>{title}</h3>
        <p className={`target-bar__description`}>{description}</p>
      </div>
    </div>
  );
};
