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
      {title && <h3 className="section__title">{title}</h3>}
      {description && <p className="section__description">{description}</p>}
    </div>
  );
};

export default Section;
