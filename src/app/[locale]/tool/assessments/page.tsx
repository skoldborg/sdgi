import { createClient } from '@/prismicio';
import Assessments from './assessments';
import { Header, LanguageSwitch } from '@/app/components';
import headerStyles from '@/app/components/Header/header.module.scss';
import { CreateAssessmentButton } from '@/app/components/Header/CreateAssessmentButton';

export default async function AssessementsPage({}: {
  params: { slug: string };
}) {
  const client = createClient();
  const api = await client.getRepository();
  const locales = api.languages.map((l) => l.id);
  const header = await client.getSingle('header');
  const page = await client.getSingle('assessments_page');
  const commonTranslations = await client.getSingle('common_translations');

  return (
    <>
      <div className="page__header">
        <Header doc={header}>
          {header.data.choose_language && (
            <li className={headerStyles.navItem}>
              <LanguageSwitch
                label={header.data.choose_language as string}
                locales={locales}
              />
            </li>
          )}
          <li className={headerStyles.navItem}>
            <CreateAssessmentButton
              label={header.data.new_assessment ?? ''}
              content={{
                create: page.data.create_assessment_modal[0],
              }}
            />
          </li>
        </Header>
      </div>
      <div className="page__content">
        <Assessments {...page} commonTranslations={commonTranslations} />
      </div>
      ;
    </>
  );
}
