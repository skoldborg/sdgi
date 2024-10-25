import { Button } from '..';
import cx from 'classnames';

import './goal-hero.scss';

export const GoalHero = ({
  title,
  description,
  goal_id,
  assessmentGoalsUrl,
  backBtnLabel,
  size,
}: {
  title: string;
  description: string;
  goal_id: number;
  assessmentGoalsUrl?: string;
  backBtnLabel?: string;
  size?: string;
}) => {
  const titles = title.split('--').map((item, idx) => {
    const text = item.trim();
    return (
      <span className={`goalhero__title-line`} key={idx}>
        {text}
      </span>
    );
  });

  const classNames = cx(
    `goalhero`,
    `goalhero--${goal_id}`,
    size && `goalhero--` + size,
  );

  return (
    <div className={classNames}>
      <div className={`goalhero__inner goalhero__inner--top`}>
        {backBtnLabel && assessmentGoalsUrl && (
          <Button
            link={assessmentGoalsUrl}
            label={backBtnLabel}
            color={`black`}
            opacity={0.7}
          />
        )}
      </div>
      <div className={`goalhero__inner`}>
        <div className={`goalhero__content`}>
          <span className={`goalhero__number`}>{goal_id}</span>
          <div className={`goalhero__text`}>
            <h1 className={`goalhero__title`}>{titles}</h1>
            <p className={`goalhero__description`}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
