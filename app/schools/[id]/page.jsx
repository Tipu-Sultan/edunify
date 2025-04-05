// app/school/[id]/page.jsx

import { Suspense } from 'react';
import { schools } from '@/lib/data';
import SchoolDetail from '@/components/schools/id/SchoolDetail';
import SkeletonDetail from '@/components/schools/id/SkeletonDetail';

export default function Page({ params }) {
  const school = schools.find((s) => s.id === parseInt(params.id));

  if (!school) return <div>School not found</div>;

  return (
    <Suspense fallback={<SkeletonDetail />}>
      <SchoolDetail school={school} />
    </Suspense>
  );
}
