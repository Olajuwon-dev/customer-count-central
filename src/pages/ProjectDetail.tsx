
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Globe, FileText, ArrowLeft, Clock, History, Settings, Calendar } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

interface Project {
  id: string;
  userId: string;
  websiteName: string;
  websiteUrl: string;
  description: string;
  requirements: string;
  status: string;
  progress: number;
  dateSubmitted: string;
  history: {
    date: string;
    action: string;
  }[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get current user
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userString);
    
    // Get projects
    const projectsString = localStorage.getItem('userProjects');
    if (!projectsString) {
      setIsLoading(false);
      return;
    }
    
    const allProjects = JSON.parse(projectsString);
    // Find the specific project
    const projectData = allProjects.find((p: Project) => p.id === id);
    
    if (!projectData) {
      navigate('/my-projects');
      return;
    }
    
    // Check if user is admin or if the project belongs to the user
    if (user.role !== 'admin' && projectData.userId !== user.email) {
      navigate('/my-projects');
      return;
    }
    
    setProject(projectData);
    setIsLoading(false);
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <svg className="animate-spin h-10 w-10 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900">Project not found</h3>
            <p className="text-gray-500 mt-2 mb-6">The project you're looking for doesn't exist or you don't have access to it.</p>
            <Link to="/my-projects">
              <Button>Go to My Projects</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate('/my-projects')} className="mr-2 p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Project Details</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{project.websiteName}</CardTitle>
                  {project.websiteUrl && (
                    <CardDescription className="flex items-center mt-1">
                      <Globe className="h-4 w-4 mr-1" /> 
                      <a 
                        href={project.websiteUrl.startsWith('http') ? project.websiteUrl : `https://${project.websiteUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-brand-500"
                      >
                        {project.websiteUrl}
                      </a>
                    </CardDescription>
                  )}
                </div>
                <Badge variant={
                  project.status === 'Completed' ? "success" :
                  project.status === 'In Progress' ? "default" :
                  "secondary"
                }>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="pt-4 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Project Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2.5" />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <WhatsAppButton />
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Description</h3>
                    <p className="text-gray-700">{project.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> Timeline
                    </h3>
                    <div className="flex items-center justify-between text-sm p-3 border rounded-md bg-gray-50">
                      <div>
                        <div className="text-gray-500">Submitted</div>
                        <div className="font-medium">{new Date(project.dateSubmitted).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Estimated Completion</div>
                        <div className="font-medium">
                          {new Date(new Date(project.dateSubmitted).setDate(
                            new Date(project.dateSubmitted).getDate() + 30
                          )).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="requirements" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium flex items-center">
                      <Settings className="h-4 w-4 mr-1" /> Requirements & Features
                    </h3>
                    <div className="p-4 border rounded-md bg-gray-50">
                      <p className="whitespace-pre-line text-gray-700">{project.requirements}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium flex items-center">
                      <History className="h-4 w-4 mr-1" /> Complete History
                    </h3>
                    <div className="space-y-4">
                      {project.history.map((item, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                              <Calendar className="h-4 w-4 text-gray-600" />
                            </div>
                            {index !== project.history.length - 1 && (
                              <div className="h-full w-px bg-gray-200 mt-1"></div>
                            )}
                          </div>
                          <div className="pt-1">
                            <p className="font-medium">{item.action}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Updates</CardTitle>
              <CardDescription>Latest activity on your project</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {project.history.slice(0, 5).map((item, index) => (
                  <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">Have questions about your project? Contact us for assistance.</p>
                <Button className="w-full">Contact Support</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
