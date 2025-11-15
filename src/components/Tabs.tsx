'use client';

import React, { useState, Children } from 'react';

interface TabProps {
  title: string;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

interface TabsProps {
  
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

const tabsArray = Children.toArray(children) as React.ReactElement<TabProps>[];

  return (
    <div className="tabs-container my-6">
      <div className="flex border-b border-border-color">
        {}
        {tabsArray.map((tab, index) => (
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
      {}
      <div className="py-4">{tabsArray[activeIndex]}</div>
    </div>
  );
};