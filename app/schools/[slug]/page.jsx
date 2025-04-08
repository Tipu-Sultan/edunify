import { Suspense } from 'react';
import SchoolDetail from '@/components/schools/id/SchoolDetail';
import SkeletonDetail from '@/components/schools/id/SkeletonDetail';
import { getSchoolBySlug } from '@/lib/client/schools';

export default async function Page({ params }) {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);

  if (!school) return <div>School not found</div>;

  return (
    <Suspense fallback={<SkeletonDetail />}>
      <SchoolDetail school={school} />
    </Suspense>
  );
}