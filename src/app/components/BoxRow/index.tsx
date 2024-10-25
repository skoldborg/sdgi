import cx from 'classnames';
import { Goal } from '@/@types/codegen/types';
import { Modal, useModal, GoalHero, GoalQuickview } from '@components';

import './box-row.scss';
import {
  GoalPageDocumentDataImpactOptionsItem,
  GoalsDocument,
  ResultPageDocument,
  Simplify,
} from '@prismicio-types';
import { useContentContext } from '@/app/contexts/content-context';
import { Option } from '../Option';
import { Box } from './Box';
import { GroupField } from '@prismicio/client';

export const BoxRow = ({
  id,
  assessmentGoals,
  goalsDoc,
  resultPage,
  impactOptions,
  label,
  color,
  type,
}: {
  id: number;
  assessmentGoals: Goal[];
  goalsDoc: GoalsDocument;
  resultPage: ResultPageDocument;
  impactOptions: GroupField<Simplify<GoalPageDocumentDataImpactOptionsItem>>;
  label: string;
  color?: string;
  type?: 'standalone';
}) => {
  const classNames = cx(
    'box-row',
    color && 'box-row--' + color,
    type && 'box-row--' + type,
  );

  const { registerModal } = useModal();
  const { commonTranslations } = useContentContext();

  return (
    <div className={classNames}>
      <div className="box-row__label">
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
                  <Modal.Window id="goal-modal" contentModifier="full-width">
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
                          {impactOptions && impact && (
                            <div className="section">
                              {impact !== 0 ? (
                                <Option
                                  type="locked"
                                  size="small"
                                  label={impactOptions[impact - 1].label ?? ''}
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
          return <Box key={i} />;
        }
      })}
    </div>
  );
};
