'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { users } from '@/lib/data';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // In a real app, this would check the auth state
    const currentUser = users[0]; // Simulating logged-in user
    if (!currentUser || !['superadmin', 'schooladmin'].includes(currentUser.role)) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}