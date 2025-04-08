// admin/layout.jsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { School, Users, Settings, Menu } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load

    const user = session?.user;
    if (!user || !user.isAdmin || !['NORMAL','SUPERADMIN', 'SCHOOLADMIN'].includes(user.userType)) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [session, status, router]);

  if (status === 'loading' || !isAuthorized) {
    return null; 
  }

  const navItems = [
    { name: 'Dashboard', value: 'dashboard', icon: School, path: '/admin/dashboard' },
    { name: 'Schools', value: 'schools', icon: School, path: '/admin/schools' },
    ...(session.user.userType === 'SCHOOLADMIN'
      ? [{ name: 'Users', value: 'users', icon: Users, path: '/admin/users' }]
      : []),
    { name: 'Settings', value: 'settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile/Tablet Menu Button */}
      <div className="md:hidden p-4">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Admin Panel</h2>
              <p className="text-sm capitalize">{session.user.userType}</p>
            </div>
            <nav className="mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.value}
                  href={item.path}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-all"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 lg:w-72 h-screen sticky top-0 border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm capitalize">{session.user.userType}</p>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.value}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-all"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}