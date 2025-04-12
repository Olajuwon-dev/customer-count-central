
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, History, Globe, FileText, Clock } from 'lucide-react';

const Profile = () => {
  // This would be fetched from an API in a real implementation
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    projects: [
      {
        id: 1,
        name: "Corporate Website Redesign",
        status: "In Progress",
        progress: 65,
        history: [
          { date: "2025-03-15", action: "Design phase completed" },
          { date: "2025-03-01", action: "Project started" },
        ],
        website: "example.com"
      },
      {
        id: 2,
        name: "E-commerce Platform",
        status: "Planning",
        progress: 15,
        history: [
          { date: "2025-04-10", action: "Requirements gathering" },
          { date: "2025-04-05", action: "Project initiated" },
        ],
        website: "shop.example.com"
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-base">{userData.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-base">{userData.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Projects</h3>
                <p className="text-base">{userData.projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="projects">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="space-y-4 mt-4">
              {userData.projects.map(project => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Globe className="h-4 w-4 mr-1" /> {project.website}
                        </CardDescription>
                      </div>
                      <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                          <Clock className="h-4 w-4" /> Recent Activity
                        </h4>
                        <ul className="space-y-2">
                          {project.history.slice(0, 2).map((item, index) => (
                            <li key={index} className="text-sm">
                              <span className="text-gray-500">{item.date}</span> - {item.action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Complete History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.projects.map(project => (
                      <div key={project.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium mb-2">{project.name}</h3>
                        <ul className="space-y-2">
                          {project.history.map((item, index) => (
                            <li key={index} className="text-sm flex items-start">
                              <span className="text-gray-500 min-w-28">{item.date}</span>
                              <span>{item.action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
