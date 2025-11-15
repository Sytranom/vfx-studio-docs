'use client';

import React, { useState } from 'react';

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

interface TabProps {
  title: string;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tabs-container my-6">
      <div className="flex border-b border-border-color">
        {children.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors
              ${
                activeIndex === index
                  ? 'border-primary-accent text-primary-accent'
                  : 'border-transparent text-text-secondary hover:border-text-secondary hover:text-text-primary'
              }`}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="py-4">{children[activeIndex]}</div>
    </div>
  );
};