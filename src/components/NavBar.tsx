import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LayoutDashboard, FileText, History } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@/context/Usercontext';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';
  const username = user?.name || 'Profile';

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-brand-600 text-2xl font-bold">B.david</span>
            </Link>
          </div>

          {!isMobile && (
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>

              {isLoggedIn ? (
                <>
                  {isAdmin ? (
                    <>
                      <Link to="/admindashboard" className="text-gray-700 hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium">
                        Dashboard
                      </Link>
                      <Link to="/admin" className="text-gray-700 hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                        <LayoutDashboard className="h-4 w-4 mr-1" /> Admin
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/submit-info" className="text-gray-700 hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-1" /> Submit Info
                      </Link>
                      <Link to="/my-projects" className="text-gray-700 hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                        <History className="h-4 w-4 mr-1" /> My Projects
                      </Link>
                    </>
                  )}

                  <Link to="/profile" className="text-gray-700 hover:text-brand-500 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <User className="h-4 w-4 mr-1" /> {username}
                  </Link>

                  <Button variant="outline" onClick={handleLogout} className="ml-4">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="mr-2">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          )}

          {isMobile && (
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-500 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-500 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-500 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>

            {isLoggedIn ? (
              <>
                {isAdmin ? (
                  <>
                    <Link to="/admindashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-500 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-500 hover:bg-gray-50 flex items-center" onClick={() => setIsMenuOpen(false)}>
                      <LayoutDashboard className="h-4 w-4 mr-1" /> Admin
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/submit-info" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-500 hover:bg-gray-50 flex items-center" onClick={() => setIsMenuOpen(false)}>
                      <FileText className="h-4 w-4 mr-1" /> Submit Info
                    </Link>
                    <Link to="/my-projects" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-500 hover:bg-gray-50 flex items-center" onClick={() => setIsMenuOpen(false)}>
                      <History className="h-4 w-4 mr-1" /> My Projects
                    </Link>
                  </>
                )}

                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-500 hover:bg-gray-50 flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-4 w-4 mr-1" /> {username}
                </Link>

                <Button variant="outline" onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full mt-2">
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="mt-4 space-y-2 px-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
