import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = user ? [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/skill-test', label: 'Skill Tests' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/mentorship', label: 'Mentorship' },
    { to: '/gigs', label: 'Gigs' },
    { to: '/courses', label: 'Courses' },
  ] : [];

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Hustlee</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {user ? (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="bg-white text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mobile-menu-button"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {user ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors duration-200"
                  role="menuitem"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors duration-200"
                role="menuitem"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors duration-200"
                role="menuitem"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors duration-200"
                role="menuitem"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 