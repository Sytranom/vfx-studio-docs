import React from 'react';

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span className="bg-primary-accent/20 text-primary-accent font-semibold px-1 py-0.5 rounded-sm">
      {children}
    </span>
  );
};

export default Highlight;