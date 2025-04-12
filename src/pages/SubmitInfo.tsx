
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Globe, FileText, Send } from 'lucide-react';

const SubmitInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    websiteName: '',
    websiteUrl: '',
    description: '',
    requirements: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission with a timeout
    setTimeout(() => {
      // Get the current user
      const userString = localStorage.getItem('user');
      if (!userString) {
        toast({
          title: "Error",
          description: "You must be logged in to submit information",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      const user = JSON.parse(userString);
      
      // Get existing projects or initialize empty array
      const existingProjectsString = localStorage.getItem('userProjects');
      const existingProjects = existingProjectsString ? JSON.parse(existingProjectsString) : [];
      
      // Create new project
      const newProject = {
        id: Date.now().toString(),
        userId: user.email,
        ...formData,
        status: 'Submitted',
        progress: 10,
        dateSubmitted: new Date().toISOString(),
        history: [
          {
            date: new Date().toISOString(),
            action: 'Project information submitted'
          }
        ]
      };
      
      // Add to projects
      const updatedProjects = [...existingProjects, newProject];
      localStorage.setItem('userProjects', JSON.stringify(updatedProjects));
      
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: "Your website information has been submitted successfully.",
      });
      
      // Reset form
      setFormData({
        websiteName: '',
        websiteUrl: '',
        description: '',
        requirements: ''
      });
      
      // Redirect to my projects
      navigate('/my-projects');
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Submit Your Website Information</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Website Details</CardTitle>
          <CardDescription>
            Provide information about your website project. We'll use this to track your project's progress.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="websiteName">Website Name</Label>
              <Input
                id="websiteName"
                name="websiteName"
                placeholder="Enter your website name"
                value={formData.websiteName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL (if existing)</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Globe className="h-4 w-4" />
                </span>
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  placeholder="www.example.com"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  className="rounded-l-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your website and its purpose"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements & Features</Label>
              <Textarea
                id="requirements"
                name="requirements"
                placeholder="List any specific requirements or features you need"
                value={formData.requirements}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate('/my-projects')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Information
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SubmitInfo;
