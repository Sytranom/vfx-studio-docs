import React from 'react';

interface PropertyReferenceProps {
  children: React.ReactNode;
}

const PropertyReference: React.FC<PropertyReferenceProps> = ({ children }) => {
  return (

<div className="property-reference my-8 rounded-lg border border-border-color bg-bg-surface overflow-hidden">
      {React.Children.map(children, (child, index) => (

<div className={`px-6 ${index > 0 ? 'border-t border-border-color' : ''}`}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default PropertyReference;