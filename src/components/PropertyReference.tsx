import React from 'react';

interface PropertyReferenceProps {
  children: React.ReactNode;
}

const PropertyReference: React.FC<PropertyReferenceProps> = ({ children }) => {
  return (
    // We remove `divide-y` and add `overflow-hidden` to ensure the child borders
    // respect the parent's rounded corners.
    <div className="property-reference my-8 rounded-lg border border-border-color bg-bg-surface overflow-hidden">
      {React.Children.map(children, (child, index) => (
        // This is the new logic:
        // 1. We wrap every child in a div with horizontal padding.
        // 2. We add a top border to every child EXCEPT the very first one (index > 0).
        <div className={`px-6 ${index > 0 ? 'border-t border-border-color' : ''}`}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default PropertyReference;