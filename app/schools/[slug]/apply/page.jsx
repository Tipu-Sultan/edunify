import { Suspense } from 'react';
import SkeletonDetail from '@/components/schools/id/SkeletonDetail';
import { getSchoolBySlug } from '@/lib/client/schools';
import SchoolApply from './SchoolApply';

export default async function Page({ params }) {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);

  if (!school) return <div>School not found</div>;

  return (
    <Suspense fallback={<SkeletonDetail />}>
      <SchoolApply school={school} />
    </Suspense>
  );
}