'use client';

import { useState } from 'react';
import { users, schools } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { School, Users, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const [currentUser] = useState(users[0]); // Simulating logged-in user
  const [newSchool, setNewSchool] = useState({
    name: '',
    board: '',
    fee: '',
    medium: '',
    location: {
      city: '',
      state: '',
      address: ''
    }
  });

  const handleAddSchool = (e) => {
    e.preventDefault();
    console.log('New school:', newSchool);
    // In a real app, this would add to the database
  };

  if (!currentUser || !['superadmin', 'schooladmin'].includes(currentUser.role)) {
    return <div className="p-8">Access denied. Please log in with admin credentials.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          {currentUser.role === 'superadmin' && (
            <TabsTrigger value="users">Users</TabsTrigger>
          )}
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
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
        </TabsContent>

        <TabsContent value="schools">
          <Card>
            <CardHeader>
              <CardTitle>Add New School</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSchool} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">School Name</Label>
                    <Input
                      id="name"
                      value={newSchool.name}
                      onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="board">Board</Label>
                    <Input
                      id="board"
                      value={newSchool.board}
                      onChange={(e) => setNewSchool({ ...newSchool, board: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="fee">Annual Fee</Label>
                    <Input
                      id="fee"
                      value={newSchool.fee}
                      onChange={(e) => setNewSchool({ ...newSchool, fee: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="medium">Medium of Instruction</Label>
                    <Input
                      id="medium"
                      value={newSchool.medium}
                      onChange={(e) => setNewSchool({ ...newSchool, medium: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={newSchool.location.city}
                      onChange={(e) => setNewSchool({
                        ...newSchool,
                        location: { ...newSchool.location, city: e.target.value }
                      })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={newSchool.location.state}
                      onChange={(e) => setNewSchool({
                        ...newSchool,
                        location: { ...newSchool.location, state: e.target.value }
                      })}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">Add School</Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 gap-6">
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
                    <div>
                      <Label>Board</Label>
                      <p>{school.board}</p>
                    </div>
                    <div>
                      <Label>Fee</Label>
                      <p>{school.fee}</p>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <p>{school.location.city}, {school.location.state}</p>
                    </div>
                    <div>
                      <Label>Medium</Label>
                      <p>{school.medium}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {currentUser.role === 'superadmin' && (
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm capitalize">
                          {user.role}
                        </span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="settings">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}