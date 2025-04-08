'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // useRouter for navigation
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast'; // Assuming useToast is in hooks

export default function SchoolApply({school}) {
  const router = useRouter(); // For navigation after submission
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    grade: '',
  });



  // Mock database save (replace with real DB logic)
  const saveToDatabase = async (data) => {
    const application = {
      schoolId: parseInt(id),
      ...data,
      submittedAt: new Date().toISOString(),
    };
    console.log('Saving to DB:', application); // Replace with actual DB logic
    return Promise.resolve(); // Simulate success
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveToDatabase(formData);
      setIsSubmitted(true);
      toast({
        title: 'Application Submitted',
        description: `Your application for ${school?.name} has been submitted successfully!`,
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleBack = () => {
    router.push(`/schools/${id}`); // Navigate back to school details
  };

  if (!school) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">School not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            {isSubmitted ? 'Application Confirmed' : `Apply to ${school.name}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Thank you for applying to {school.name}! Your application has been successfully submitted. We’ll get back to you soon.
              </p>
              <Button onClick={handleBack}>Back to School Details</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="parentName">Parent's Name</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  required
                  placeholder="Enter parent's name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="Enter email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="childName">Child's Name</Label>
                <Input
                  id="childName"
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  required
                  placeholder="Enter child's name"
                />
              </div>
              <div>
                <Label htmlFor="grade">Applying for Grade</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  required
                  placeholder="Enter grade (e.g., 5)"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={handleBack}>
                  Cancel
                </Button>
                <Button type="submit">Submit Application</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}