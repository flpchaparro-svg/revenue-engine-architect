import React from 'react';

const PageTransition: React.FC<{ children: React.ReactNode, currentView: string }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full">
      {children}
    </div>
  );
};

export default PageTransition;