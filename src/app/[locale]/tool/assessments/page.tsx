import { createClient } from '@/prismicio';
import Assessments from './assessments';

export default async function AssessementsPage() {
  const client = createClient();
  const page = await client.getSingle('assessments_page');
  const commonTranslations = await client.getSingle('common_translations');

  const { error_messages } = commonTranslations.data;

  console.log(page);
  console.log(error_messages);

  // useGetUserQuery({
  //   variables: {
  //     user_id: user.
  //   }
  // })

  return (
    <>
      <div className="page__content">
        <Assessments {...page} />
      </div>
      ;
    </>
  );
}
