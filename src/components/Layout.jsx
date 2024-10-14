import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState('base');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-${fontSize}`}>
      <nav className="bg-vibrant-primary dark:bg-vibrant-secondary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-white">Mobility Assistance</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-white hover:text-vibrant-accent px-3 py-2 rounded-md text-lg font-medium">Login</Link>
              <Link to="/signup" className="text-white hover:text-vibrant-accent px-3 py-2 rounded-md text-lg font-medium">Sign Up</Link>
              <button onClick={toggleDarkMode} className="text-white p-2 rounded-full hover:bg-vibrant-accent">
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <select onChange={(e) => changeFontSize(e.target.value)} className="bg-white text-vibrant-text rounded-md">
                <option value="base">Normal</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-white p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/login" className="text-white hover:text-vibrant-accent block px-3 py-2 rounded-md text-base font-medium">Login</Link>
              <Link to="/signup" className="text-white hover:text-vibrant-accent block px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
            </div>
          </div>
        )}
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;