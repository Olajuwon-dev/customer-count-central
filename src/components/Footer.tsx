
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="/privacy" className="text-gray-500 hover:text-gray-600">
            Privacy
          </Link>
          <Link to="/terms" className="text-gray-500 hover:text-gray-600">
            Terms
          </Link>
          <Link to="/contact" className="text-gray-500 hover:text-gray-600">
            Contact
          </Link>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} B.david / Olajuwon-Dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
