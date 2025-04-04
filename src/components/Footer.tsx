import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-8 text-center text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} Query GPT. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors">Documentation</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
