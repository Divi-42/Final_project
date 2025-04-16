import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300';
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">DataViz</span>
          <span className="ml-2 text-gray-700 dark:text-gray-300">Dashboard</span>
        </Link>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        
        <nav className="hidden md:flex space-x-8 text-lg">
          <Link to="/" className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ${isActive('/')}`}>Home</Link>
          <Link to="/how-it-works" className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ${isActive('/how-it-works')}`}>How It Works</Link>
          <Link to="/upload" className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ${isActive('/upload')}`}>Upload</Link>
          <Link to="/dashboard" className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ${isActive('/dashboard')}`}>Dashboard</Link>
          <Link to="/demo" className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ${isActive('/demo')}`}>Demo</Link>
          <Link to="/insights" className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ${isActive('/insights')}`}>Insights</Link>
          <Link to="/about" className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ${isActive('/about')}`}>About</Link>
          <Link to="/contact" className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ${isActive('/contact')}`}>Contact</Link>
        </nav>
        
        <button className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu - would be expanded with state management */}
      <div className="hidden md:hidden px-4 py-2 bg-gray-100 dark:bg-gray-700">
        <div className="flex flex-col space-y-2">
          <Link to="/" className={`px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 ${isActive('/')}`}>Home</Link>
          <Link to="/how-it-works" className={`px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 ${isActive('/how-it-works')}`}>How It Works</Link>
          <Link to="/upload" className={`px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 ${isActive('/upload')}`}>Upload</Link>
          <Link to="/dashboard" className={`px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 ${isActive('/dashboard')}`}>Dashboard</Link>
          <Link to="/demo" className={`px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 ${isActive('/demo')}`}>Demo</Link>
          <Link to="/insights" className={`px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 ${isActive('/insights')}`}>Insights</Link>
          <Link to="/about" className={`px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 ${isActive('/about')}`}>About</Link>
          <Link to="/contact" className={`px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 ${isActive('/contact')}`}>Contact</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
