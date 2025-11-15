import React from 'react';

interface PropertyReferenceProps {
  children: React.ReactNode;
}

const PropertyReference: React.FC<PropertyReferenceProps> = ({ children }) => {
  return (
    <div className="property-reference my-8 divide-y divide-border-color rounded-lg border border-border-color bg-bg-surface">
      {React.Children.map(children, (child, index) => (
        <div className="px-6">{child}</div>
      ))}
    </div>
  );
};

export default PropertyReference;