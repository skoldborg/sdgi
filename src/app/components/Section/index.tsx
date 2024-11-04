import React from 'react';
import './section.scss';
import cx from 'classnames';

const Section = ({
  title,
  description,
  print = false,
}: {
  title: string;
  description: string;
  print?: boolean;
}) => {
  const classNames = cx('section', print && 'print-only');

  return (
    <div className={classNames}>
      {title && (
        <h3
          className={cx('section__title', print && 'section__title--lowercase')}
        >
          {title}
        </h3>
      )}
      {description && <p className="section__description">{description}</p>}
    </div>
  );
};

export default Section;
