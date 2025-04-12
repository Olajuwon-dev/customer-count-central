
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, Globe, Phone, Mail, Save } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const AddCustomer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    websiteDetails: '',
    notes: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Name and email are required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Create customer object
    const newCustomer = {
      id: uuidv4(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      websiteDetails: formData.websiteDetails,
      notes: formData.notes,
      dateAdded: new Date().toISOString()
    };

    // Simulate API call
    setTimeout(() => {
      // Get existing customers or initialize empty array
      const existingCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
      
      // Add new customer
      const updatedCustomers = [...existingCustomers, newCustomer];
      
      // Save to localStorage
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      
      setIsLoading(false);
      toast({
        title: "Customer Added",
        description: "The customer has been successfully added"
      });
      
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="page-container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Customer</h1>
        <p className="text-gray-600 mt-1">Enter customer and website details</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <UserPlus className="mr-2 h-5 w-5" />
            Customer Information
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Customer Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">
                Phone Number
              </Label>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website" className="text-gray-700">
                Website URL
              </Label>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-400 mr-2" />
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="e.g. example.com"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <Label htmlFor="websiteDetails" className="text-gray-700">
              Website Details
            </Label>
            <Textarea
              id="websiteDetails"
              name="websiteDetails"
              value={formData.websiteDetails}
              onChange={handleChange}
              placeholder="Enter hosting details, login credentials, etc."
              rows={3}
            />
          </div>
          
          <div className="space-y-2 mb-8">
            <Label htmlFor="notes" className="text-gray-700">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any additional information about this customer"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center">
                  <Save className="mr-2 h-5 w-5" />
                  Save Customer
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
