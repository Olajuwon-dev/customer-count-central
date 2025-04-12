
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { User, Mail, Phone, Globe, ExternalLink, Edit, Trash2, ArrowLeft } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  websiteDetails?: string;
  notes?: string;
  dateAdded: string;
}

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching customer data
    setIsLoading(true);
    setTimeout(() => {
      const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
      const foundCustomer = storedCustomers.find((c: Customer) => c.id === id);
      
      if (foundCustomer) {
        setCustomer(foundCustomer);
      } else {
        toast({
          title: "Error",
          description: "Customer not found",
          variant: "destructive"
        });
        navigate('/dashboard');
      }
      
      setIsLoading(false);
    }, 1000);
  }, [id, navigate, toast]);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this customer?")) {
      // Get existing customers
      const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
      
      // Remove the customer
      const updatedCustomers = storedCustomers.filter((c: Customer) => c.id !== id);
      
      // Save to localStorage
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      
      toast({
        title: "Customer Deleted",
        description: "The customer has been removed successfully"
      });
      
      navigate('/dashboard');
    }
  };

  if (isLoading) {
    return (
      <div className="page-container py-20 text-center">
        <svg className="animate-spin h-12 w-12 text-brand-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-gray-600">Loading customer details...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="page-container py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Not Found</h2>
        <p className="text-gray-600 mb-6">The requested customer could not be found.</p>
        <Link to="/dashboard">
          <Button>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container py-10">
      <div className="flex items-center mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
          <p className="text-gray-600 mt-1">Customer details and information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <User className="mr-2 h-5 w-5 text-brand-500" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="mt-1 text-gray-900">{customer.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-gray-900 flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-1" />
                    <a href={`mailto:${customer.email}`} className="text-brand-600 hover:underline">
                      {customer.email}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  {customer.phone ? (
                    <p className="mt-1 text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-1" />
                      <a href={`tel:${customer.phone}`} className="text-brand-600 hover:underline">
                        {customer.phone}
                      </a>
                    </p>
                  ) : (
                    <p className="mt-1 text-gray-500">Not provided</p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Website</p>
                  {customer.website ? (
                    <p className="mt-1 text-gray-900 flex items-center">
                      <Globe className="h-4 w-4 text-gray-400 mr-1" />
                      <a 
                        href={`https://${customer.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:underline flex items-center"
                      >
                        {customer.website}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </p>
                  ) : (
                    <p className="mt-1 text-gray-500">Not provided</p>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Website Details</p>
                {customer.websiteDetails ? (
                  <p className="mt-1 text-gray-900 whitespace-pre-wrap">{customer.websiteDetails}</p>
                ) : (
                  <p className="mt-1 text-gray-500">No details provided</p>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Additional Notes</p>
                {customer.notes ? (
                  <p className="mt-1 text-gray-900 whitespace-pre-wrap">{customer.notes}</p>
                ) : (
                  <p className="mt-1 text-gray-500">No additional notes</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Customer Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => navigate(`/edit-customer/${customer.id}`)}
            >
              <Edit className="mr-2 h-5 w-5 text-gray-600" />
              Edit Customer
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Delete Customer
            </Button>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-2">Customer Since</p>
              <p className="text-gray-900">
                {new Date(customer.dateAdded).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDetail;
