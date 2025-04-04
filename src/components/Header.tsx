import React from 'react';
import { Database } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="w-full py-4 px-4 md:px-8 flex items-center justify-between animate-fade-in">
      <div className="flex items-center space-x-2">
        <Database className="h-6 w-6 text-primary" />
        <span className="font-semibold text-xl">Query GPT</span>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
