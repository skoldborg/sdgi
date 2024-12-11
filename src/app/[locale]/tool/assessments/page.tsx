import { createClient } from '@/prismicio';
import Assessments from './assessments';
import { Header, LanguageSwitch } from '@/app/components';
import { CreateAssessmentButton } from '@/app/components/Header/CreateAssessmentButton';

export default async function AssessementsPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const client = createClient();
  const api = await client.getRepository();
  const locales = api.languages.map((l) => l.id);
  const header = await client.getSingle('header', {
    lang: params.locale,
  });
  const page = await client.getSingle('assessments_page', {
    lang: params.locale,
  });

  return (
    <>
      <div className="page-header">
        <Header doc={header}>
          {header.data.choose_language && (
            <li className="mx-3 last-of-type:mr-0">
              <LanguageSwitch
                label={header.data.choose_language as string}
                locales={locales}
              />
            </li>
          )}
          <li className="mx-3 last-of-type:mr-0">
            <CreateAssessmentButton
              label={header.data.new_assessment ?? ''}
              content={{
                create: page.data.create_assessment_modal[0],
              }}
            />
          </li>
        </Header>
      </div>
      <div className="bg-gray-light min-h-screen pb-16 pt-4 md:pt-16 px-3 md:px-6">
        <Assessments {...page} />
      </div>
    </>
  );
}
