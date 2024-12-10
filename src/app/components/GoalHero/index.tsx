import { Button } from '..';
import cx from 'classnames';

export const goalBgs = [
  'bg-goal-1',
  'bg-goal-2',
  'bg-goal-3',
  'bg-goal-4',
  'bg-goal-5',
  'bg-goal-6',
  'bg-goal-7',
  'bg-goal-8',
  'bg-goal-9',
  'bg-goal-10',
  'bg-goal-11',
  'bg-goal-12',
  'bg-goal-13',
  'bg-goal-14',
  'bg-goal-15',
  'bg-goal-16',
  'bg-goal-17',
];

export const GoalHero = ({
  title,
  description,
  goal_id,
  assessmentGoalsUrl,
  backBtnLabel,
  size = 'base',
}: {
  title: string;
  description: string;
  goal_id: number;
  assessmentGoalsUrl?: string;
  backBtnLabel?: string;
  size?: 'base' | 'small' | 'large';
}) => {
  const titles = title.split('--').map((item, idx) => {
    const text = item.trim();
    return (
      <span className="block whitespace-nowrap" key={idx}>
        {text}
      </span>
    );
  });

  const classNames = cx(
    'text-white overflow-hidden',
    size === 'large' &&
      'h-[calc(100vh-265px)] md:h-[calc(100vh-235px)] flex justify-center items-center',
    goalBgs[goal_id - 1],
    size && `goalhero--` + size,
  );

  return (
    <div data-component="goal-hero" className={classNames}>
      <div
        className={cx(
          'max-w-6xl py-6 px-4 mb-8 mx-auto md:mb-12 md:p-6',
          size === 'small' && 'p-8',
          size === 'large' && 'hidden',
        )}
      >
        {backBtnLabel && assessmentGoalsUrl && (
          <Button
            link={assessmentGoalsUrl}
            label={backBtnLabel}
            color="black"
            opacity={0.7}
          />
        )}
      </div>
      <div
        className={cx(
          'max-w-6xl pb-6 px-4 mb-8 mx-auto md:mb-12 md:px-6 md:pb-6',
          size === 'large' && 'flex m-0',
        )}
      >
        <div className={cx('flex', size === 'large' && 'justify-center')}>
          <span
            className={cx(
              'inline-block pr-3 text-black/70 font-header font-bold tracking-normal',
              'md-minor:pr-6',
              size === 'small'
                ? 'text-[60px] md-minor:text-[110px] leading-[90px]'
                : 'text-[60px] md-minor:text-[180px] leading-[52px] md-minor:leading-[138px] xl:text-[240px] xl:leading-[180px] xl:pt-2',
              goal_id === 7 && 'text-white/100',
            )}
          >
            {goal_id}
          </span>
          <div>
            <h1
              className={cx(
                'leading-0 font-header font-bold uppercase m-0 mb-2',
                'md-minor:mb-4 xl:mb-6',
                size === 'small'
                  ? 'text-[64px]'
                  : 'text-[28px] leading-[30px] md-minor:text-[60px] md-minor:leading-[60px] xl:text-[100px] xl:leading-[100px]',
              )}
            >
              {titles}
            </h1>
            <p
              className={cx(
                'm-0 leading-7 max-w-2xl',
                size === 'small' ? 'text-lg' : 'text-lg md-minor:text-2xl',
              )}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
