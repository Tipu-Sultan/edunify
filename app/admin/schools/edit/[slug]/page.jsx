// pages/schools/edit/[slug].js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EditSchool() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { slug } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (status === 'authenticated' && slug) {
      fetch(`/api/admin/schools/${slug}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch school');
          return res.json();
        })
        .then(data => {
          if ('error' in data) {
            throw new Error(data.error);
          }
          // Check if schooladmin is authorized to edit this school
          if (session.user.userType === 'SCHOOLADMIN' && data.createdBy._id !== session.user.id) {
            router.push('/unauthorized');
          } else {
            setForm(data);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [status, session, slug, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/schools/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push('/admin/schools');
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

  if (status === 'loading' || !form) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit School</h1>
      <form onSubmit={handleSubmit} className="grid gap-6 max-w-2xl">
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
        <Button type="submit">Update School</Button>
      </form>
    </div>
  );
}