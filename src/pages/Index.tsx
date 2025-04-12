
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from './HomePage';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to HomePage
    navigate('/', { replace: true });
  }, [navigate]);

  return <HomePage />;
};

export default Index;
