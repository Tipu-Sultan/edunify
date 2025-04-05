'use client';

import { schools } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function SchoolsManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Schools Management</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button>Add New School</Button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredSchools.map((school) => (
          <Card key={school.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{school.name}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
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
    </div>
  );
}