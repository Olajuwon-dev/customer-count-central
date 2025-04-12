
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users, Globe, Database, Shield, History } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-600 to-teal-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Website Information Is <br className="hidden md:block" /> Secure With Olajuwon-Dev
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Share your website details in our secure platform. Track your project's progress, view history, 
            and maintain complete control of your information at all times.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose B.david?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center card-hover">
              <div className="bg-brand-100 p-3 rounded-full inline-flex mb-4">
                <Shield className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Information</h3>
              <p className="text-gray-600">
                Your information is encrypted and securely stored. Only you and authorized personnel have access.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center card-hover">
              <div className="bg-teal-100 p-3 rounded-full inline-flex mb-4">
                <History className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Project Tracking</h3>
              <p className="text-gray-600">
                Track your project's progress in real-time and view complete history of all updates and milestones.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center card-hover">
              <div className="bg-brand-100 p-3 rounded-full inline-flex mb-4">
                <Database className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Centralized Dashboard</h3>
              <p className="text-gray-600">
                Access all your website details, project status, and communication history in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start tracking your Project?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already using CustomerTrack to manage their client relationships.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
