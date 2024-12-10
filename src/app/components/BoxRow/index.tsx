import cx from 'classnames';
import { Goal } from '@/@types/codegen/types';
import { Modal, useModal, GoalHero, GoalQuickview } from '@components';

import {
  GoalPageDocumentDataImpactOptionsItem,
  GoalsDocument,
  ResultPageDocument,
  Simplify,
} from '@prismicio-types';
import { useContentContext } from '@/app/contexts/content-context';
import { Option } from '../Option';
import { Box, EmptyBox } from './Box';
import { GroupField } from '@prismicio/client';

const getImpactOptionByImpactLevel = (
  impactLevel: number,
  impactOptions: GroupField<Simplify<GoalPageDocumentDataImpactOptionsItem>>,
) => {
  return impactOptions.find((o) => o.value === impactLevel);
};

export type BoxRowColor = 'gray' | 'gray-light' | 'green' | 'red';

export const BoxRow = ({
  id,
  assessmentGoals,
  goalsDoc,
  resultPage,
  impactOptions,
  label,
  color = 'gray',
  standalone = false,
}: {
  id: number;
  assessmentGoals: Goal[];
  goalsDoc: GoalsDocument;
  resultPage: ResultPageDocument;
  impactOptions: GroupField<Simplify<GoalPageDocumentDataImpactOptionsItem>>;
  label: string;
  color?: BoxRowColor;
  standalone?: boolean;
}) => {
  const classNames = cx(
    'clear-both',
    'box-row',
    `group box-color-${color}`,
    standalone && 'ml-[150px] print:ml-[100px]',
  );

  const { registerModal } = useModal();
  const { commonTranslations } = useContentContext();

  return (
    <div className={classNames}>
      <div
        className={cx(
          'float-left flex h-[50px] items-center text-base font-bold text-dark w-[150px] text-right print:h-[30px] print:text-xs print:w-[100px]',
          standalone && 'float-none mt-6 ml-1',
        )}
      >
        <span>{label}</span>
      </div>

      {assessmentGoals.map((g, i) => {
        if (g.impact === id) {
          return (
            <Box
              goal={assessmentGoals[i]}
              key={i}
              onClick={() => {
                const goal_id = assessmentGoals[i].goal_id;
                const goalContent = goalsDoc.data.body.find(
                  (goal) => goal.primary.id === goal_id,
                );
                const impact = assessmentGoals[goal_id - 1].impact;

                registerModal(
                  <Modal.Window id="goal-modal" fullWidth>
                    <>
                      <GoalHero
                        size="small"
                        title={goalContent?.primary.title ?? ''}
                        description={goalContent?.primary.description ?? ''}
                        goal_id={goal_id}
                        backBtnLabel={
                          commonTranslations?.data.button_labels[0]
                            ?.back_to_assessment_board ?? ''
                        }
                      />
                      {goalContent && resultPage && (
                        <GoalQuickview
                          goal={assessmentGoals[goal_id - 1]}
                          goalContent={goalContent}
                          accordionOpenLabel={
                            resultPage.data.goal_accordion_labels[0]?.open ??
                            'Open targets'
                          }
                          accordionCloseLabel={
                            resultPage.data.goal_accordion_labels[0]?.close ??
                            'Close targets'
                          }
                          motivationTitle={
                            resultPage.data.motivation_title ?? 'Motivation'
                          }
                        >
                          {impactOptions && (
                            <div className="pb-12">
                              {impact && impact !== 0 ? (
                                <Option
                                  type="locked"
                                  size="small"
                                  label={
                                    getImpactOptionByImpactLevel(
                                      impact,
                                      impactOptions,
                                    )?.label ?? ''
                                  }
                                />
                              ) : (
                                <Option
                                  type="locked"
                                  size="small"
                                  label={impactOptions[5]?.label ?? ''}
                                />
                              )}
                            </div>
                          )}
                        </GoalQuickview>
                      )}
                    </>
                  </Modal.Window>,
                );
              }}
            />
          );
        } else {
          return <EmptyBox key={i} />;
        }
      })}
    </div>
  );
};
