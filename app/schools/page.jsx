import { Suspense } from 'react';
import SkeletonCard from '@/components/schools/SkeletonCard';
import SchoolList from '@/components/schools/SchoolList';
import {getSchools} from '@/lib/client/schools';

export default async function Schools() {
  const schoolsData = await getSchools();
  return (
    <div>
      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 py-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        }
      >
        <SchoolList schools={schoolsData} />
      </Suspense>
    </div>
  );
}