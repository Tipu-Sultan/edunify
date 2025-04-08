// pages/schools/create.js
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CreateSchool() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', slug: '', description: '', address: { street: '', city: '', state: '', postalCode: '' },
    contact: { phone: '', email: '' }, board: '', educationLevels: [], medium: [], fees: { annualFee: '' },
    schoolType: '', gender: '',
  });

  if (status === 'authenticated' && session?.user?.userType !== 'SCHOOLADMIN') {
    router.push('/unauthorized');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error);
        return;
      }
    //   router.push('/schools');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="p-8 mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Add New School</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div>
          <Label>Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <Label>Slug</Label>
          <Input name="slug" value={form.slug} onChange={handleChange} required />
        </div>
        <div>
          <Label>Description</Label>
          <Input name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div>
          <Label>Street</Label>
          <Input name="address.street" value={form.address.street} onChange={handleChange} required />
        </div>
        <div>
          <Label>City</Label>
          <Input name="address.city" value={form.address.city} onChange={handleChange} required />
        </div>
        <div>
          <Label>State</Label>
          <Input name="address.state" value={form.address.state} onChange={handleChange} required />
        </div>
        <div>
          <Label>Postal Code</Label>
          <Input name="address.postalCode" value={form.address.postalCode} onChange={handleChange} required />
        </div>
        <div>
          <Label>Phone</Label>
          <Input name="contact.phone" value={form.contact.phone} onChange={handleChange} required />
        </div>
        <div>
          <Label>Email</Label>
          <Input name="contact.email" value={form.contact.email} onChange={handleChange} required />
        </div>
        <div>
          <Label>Board</Label>
          <Select onValueChange={value => setForm(prev => ({ ...prev, board: value }))} value={form.board}>
            <SelectTrigger><SelectValue placeholder="Select board" /></SelectTrigger>
            <SelectContent>
              {['CBSE', 'ICSE', 'IB', 'State', 'Other'].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Annual Fee (INR)</Label>
          <Input name="fees.annualFee" type="number" value={form.fees.annualFee} onChange={handleChange} required />
        </div>
        <div>
          <Label>School Type</Label>
          <Select onValueChange={value => setForm(prev => ({ ...prev, schoolType: value }))} value={form.schoolType}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              {['Public', 'Private', 'International', 'Boarding', 'Day'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Gender</Label>
          <Select onValueChange={value => setForm(prev => ({ ...prev, gender: value }))} value={form.gender}>
            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
            <SelectContent>
              {['Co-ed', 'Boys', 'Girls'].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Create School</Button>
      </form>
    </div>
  );
}