
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Globe, BarChart, Search, PieChart, Calendar, User, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for the dashboard - would come from API in real app
  const stats = {
    totalCustomers: 128,
    activeProjects: 85,
    completedProjects: 43,
    newCustomersThisMonth: 14
  };
  
  const customers = [
    { id: 1, name: "Tech Solutions Inc.", website: "techsolutions.com", status: "Active", projects: 3 },
    { id: 2, name: "Creative Studios", website: "creativestudios.org", status: "Active", projects: 1 },
    { id: 3, name: "Global Retail", website: "globalretail.net", status: "Inactive", projects: 2 },
    { id: 4, name: "Health Services", website: "healthservices.com", status: "Active", projects: 1 },
    { id: 5, name: "Education Portal", website: "educationportal.org", status: "Active", projects: 2 },
  ];
  
  const recentActivity = [
    { id: 1, customer: "Tech Solutions Inc.", action: "Project milestone completed", date: "Today" },
    { id: 2, customer: "Creative Studios", action: "New project started", date: "Yesterday" },
    { id: 3, customer: "Health Services", action: "Updated customer details", date: "2 days ago" },
    { id: 4, customer: "Global Retail", action: "Customer information updated", date: "3 days ago" },
    { id: 5, customer: "Education Portal", action: "New website added", date: "4 days ago" },
  ];

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.website.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" /> Settings
          </Button>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{stats.totalCustomers}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{stats.activeProjects}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{stats.completedProjects}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Customers (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{stats.newCustomersThisMonth}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="customers" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center w-1/2">
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="ghost" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-12 p-4 text-sm font-medium">
              <div className="col-span-4">Customer</div>
              <div className="col-span-3">Website</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Projects</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="grid grid-cols-12 p-4 text-sm border-t">
                <div className="col-span-4">{customer.name}</div>
                <div className="col-span-3">{customer.website}</div>
                <div className="col-span-2">
                  <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                    {customer.status}
                  </Badge>
                </div>
                <div className="col-span-2">{customer.projects}</div>
                <div className="col-span-1 text-right">
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            ))}
            
            {filteredCustomers.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">No customers found</div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="h-full w-px bg-border"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.customer}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-60 w-60 flex items-center justify-center">
                  <PieChart className="h-40 w-40 text-muted-foreground" />
                  <div className="absolute text-center">
                    <div className="text-xl font-bold">{stats.totalCustomers}</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Active Projects</span>
                      <span>{stats.activeProjects}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(stats.activeProjects / (stats.activeProjects + stats.completedProjects)) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Completed Projects</span>
                      <span>{stats.completedProjects}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${(stats.completedProjects / (stats.activeProjects + stats.completedProjects)) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
