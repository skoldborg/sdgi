import { createClient } from '@/prismicio';
import Assessments from './assessments';

export default async function AssessementsPage({}: {
  params: { slug: string };
}) {
  const client = createClient();
  const page = await client.getSingle('assessments_page');
  const commonTranslations = await client.getSingle('common_translations');

  return (
    <>
      <div className="page__content">
        <Assessments {...page} commonTranslations={commonTranslations} />
      </div>
      ;
    </>
  );
}
