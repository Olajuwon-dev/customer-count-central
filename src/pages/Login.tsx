import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;

        localStorage.setItem('user', JSON.stringify({
          name: user.displayName,
          email: user.email,
          uid: user.uid
        }));

        toast({
          title: "Signed in",
          description: `Welcome back${user.displayName ? `, ${user.displayName}` : ''}!`
        });
        navigate('/dashboard');
      } else {
        setIsLoading(false);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAdminLogin = () => {
    setIsLoading(true);
    
    // Create admin user in localStorage
    const adminUser = {
      name: "Admin User",
      email: "admin@bdavid.com",
      isAdmin: true
    };
    
    localStorage.setItem('user', JSON.stringify(adminUser));
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Admin Signed In",
        description: "You have successfully signed in as an admin"
      });
      navigate('/admin');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-brand-600 hover:text-brand-800">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="auth-input pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="auth-button w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </span>
            )}
          </Button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
<<<<<<< HEAD
              <span className="px-2 bg-white text-gray-500">Admin Login</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="admin-username">Admin Username</Label>
              <Input
                id="admin-username"
                type="text"
                placeholder="Enter admin username"
                className="auth-input"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="admin-password">Admin Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                className="auth-input"
              />
            </div>
            
            <Button 
              type="button"
              className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-900"
              onClick={handleAdminLogin}
              disabled={isLoading}
            >
              <Shield className="mr-2 h-5 w-5" />
              Admin Login
            </Button>
          </div>
=======
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>
          
          <Button 
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={handleAdminLogin}
            disabled={isLoading}
          >
            <Shield className="mr-2 h-5 w-5" />
            Admin Login
          </Button>
>>>>>>> 23f3146 (login/navbar)
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-brand-600 hover:text-brand-800 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
