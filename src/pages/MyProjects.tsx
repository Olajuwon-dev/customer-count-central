
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, FileText, ExternalLink, Clock, History, PlusCircle } from 'lucide-react';

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

const MyProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    // Get current user
    const userString = localStorage.getItem('user');
    if (!userString) {
      setIsLoading(false);
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
    // Filter projects for current user
    const userProjects = allProjects.filter((project: Project) => project.userId === user.email);
    
    setProjects(userProjects);
    setIsLoading(false);
  }, []);

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : activeTab === 'active' 
      ? projects.filter(p => p.status !== 'Completed')
      : projects.filter(p => p.status === 'Completed');

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Projects</h1>
          <p className="text-gray-600">Track the progress of your website projects</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/submit-info">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>
      </div>
      
      <Tabs defaultValue="active" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Projects</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <svg className="animate-spin h-8 w-8 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No projects yet</h3>
            <p className="text-gray-500 mt-2 mb-6 text-center max-w-md">
              You haven't submitted any website information yet. Start by creating your first project.
            </p>
            <Link to="/submit-info">
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Submit Website Info
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <History className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No {activeTab} projects</h3>
            <p className="text-gray-500 mt-2 mb-6 text-center max-w-md">
              You don't have any {activeTab} projects at the moment.
            </p>
            <Link to="/submit-info">
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Submit Website Info
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.websiteName}</CardTitle>
                    {project.websiteUrl && (
                      <CardDescription className="flex items-center mt-1">
                        <Globe className="h-4 w-4 mr-1" /> 
                        <a 
                          href={project.websiteUrl.startsWith('http') ? project.websiteUrl : `https://${project.websiteUrl}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-brand-500"
                        >
                          {project.websiteUrl}
                          <ExternalLink className="h-3 w-3 ml-1" />
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
              
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Project Description</h4>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> Recent Activity
                  </h4>
                  <div className="space-y-2">
                    {project.history.slice(0, 3).map((item, index) => (
                      <div key={index} className="text-sm flex items-start">
                        <span className="text-gray-500 min-w-28">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                        <span className="text-gray-700">{item.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <Link to={`/project/${project.id}`}>
                    <Button variant="outline" className="w-full">View Project Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjects;
