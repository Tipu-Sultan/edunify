// admin/page.jsx
'use client';

import { useState } from 'react';
import { users, schools } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { School, Users, Settings } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';
  const [currentUser] = useState(users[0]);
  const [newSchool, setNewSchool] = useState({
    name: '',
    board: '',
    fee: '',
    medium: '',
    location: { city: '', state: '', address: '' },
  });

  const handleAddSchool = (e) => {
    e.preventDefault();
    console.log('New school:', newSchool);
  };

  if (!currentUser || !['superadmin', 'schooladmin'].includes(currentUser.role)) {
    return <div className="p-8">Access denied. Please log in with admin credentials.</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5" />
                Total Schools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{schools.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{users.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold capitalize">{currentUser.role}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'schools' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New School</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSchool} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Form fields remain the same */}
                  <div>
                    <Label htmlFor="name">School Name</Label>
                    <Input
                      id="name"
                      value={newSchool.name}
                      onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                      required
                    />
                  </div>
                  {/* ... other form fields ... */}
                </div>
                <Button type="submit" className="w-full">Add School</Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            {schools.map((school) => (
              <Card key={school.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{school.name}</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* School details remain the same */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && currentUser.role === 'superadmin' && (
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  {/* User list remains the same */}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'settings' && (
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <p className="text-lg">{currentUser.email}</p>
              </div>
              <div>
                <Label>Role</Label>
                <p className="text-lg capitalize">{currentUser.role}</p>
              </div>
              <Button>Update Profile</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}