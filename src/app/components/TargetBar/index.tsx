import './targetbar.scss';
import cx from 'classnames';

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
  imageWidth?: number;
  imageHeight?: number;
}) => {
  const classNames = cx('target-bar', size && 'target-bar--' + size);

  return (
    <div className={classNames}>
      <figure className={`target-bar__icon`}>
        <img src={imageUrl} alt="" className={`target-bar__icon-image`} />
      </figure>
      <div className={`target-bar__content`}>
        <h3 className={`target-bar__title`}>{title}</h3>
        <p className={`target-bar__description`}>{description}</p>
      </div>
    </div>
  );
};
