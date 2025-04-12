
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Database, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="page-container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About CustomerTrack</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A simple, powerful platform to manage your customers and track their websites in one centralized location.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          CustomerTrack was built to solve the common problem many web designers, developers, and agencies face: 
          keeping track of all their clients and their websites in one organized system. Our mission is to provide a 
          simple yet powerful tool that helps you maintain client relationships and never lose track of important website details.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-brand-100 p-3 rounded-full mb-4">
              <Users className="h-6 w-6 text-brand-600" />
            </div>
            <h3 className="font-semibold mb-2">Centralized Client Management</h3>
            <p className="text-gray-600">Keep all your client information in one secure place, accessible anytime.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-teal-100 p-3 rounded-full mb-4">
              <Database className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="font-semibold mb-2">Website Record Keeping</h3>
            <p className="text-gray-600">Track domain names, hosting details, credentials, and other critical website information.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-brand-100 p-3 rounded-full mb-4">
              <Shield className="h-6 w-6 text-brand-600" />
            </div>
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your customer data remains private and secure with our platform.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-brand-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Customer Database</h3>
                <p className="text-gray-600">
                  Store all your customer contact information, notes, and details in an organized database.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-brand-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Website Information</h3>
                <p className="text-gray-600">
                  Track domain names, hosting providers, login details, and other critical website information.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-brand-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Quick Access</h3>
                <p className="text-gray-600">
                  Easily find and access customer information when you need it most.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-brand-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Simple Interface</h3>
                <p className="text-gray-600">
                  User-friendly design that's easy to navigate and use on any device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-brand-600 to-teal-600 rounded-lg shadow-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="mb-6 text-white/90 max-w-2xl mx-auto">
          Join our growing community of web professionals who trust CustomerTrack to manage their client relationships.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
              Create Account
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
