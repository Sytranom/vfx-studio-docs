import React from 'react';

interface StepsProps {
  children: React.ReactNode;
}

const Steps: React.FC<StepsProps> = ({ children }) => {
  return <div className="steps my-8">{children}</div>;
};

export default Steps;