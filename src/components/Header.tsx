import React from 'react';
import { Database } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full py-4 px-4 md:px-8 flex items-center justify-between animate-fade-in">
      <Link to="/" className="flex items-center space-x-2 hover:text-primary transition-colors">
        <Database className="h-6 w-6 text-primary" />
        <span className="font-semibold text-xl">Query GPT</span>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
