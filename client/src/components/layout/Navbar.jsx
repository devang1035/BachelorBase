import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-bold">BachelorBase</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link to="/" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                Home
              </Link>
              {user?.role === 'owner' && (
                <>
                  <Link to="/my-listings" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                    My Properties
                  </Link>
                  <Link to="/add-listing" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                    Add Property
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">{user.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {user?.role === 'owner' && (
            <>
              <Link
                to="/my-listings"
                className="block text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                My Properties
              </Link>
              <Link
                to="/add-listing"
                className="block text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Property
              </Link>
            </>
          )}
          {user ? (
            <div className="border-t border-indigo-500 pt-2">
              <span className="block text-white px-3 py-2">{user.name}</span>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="border-t border-indigo-500 pt-2">
              <Link
                to="/login"
                className="block text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;