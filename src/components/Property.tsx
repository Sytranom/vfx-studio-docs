import React from 'react';
import { Type, ToggleRight, Hash, Brush } from 'lucide-react';

interface PropertyProps {
  name: string;
  type: string;
  defaultValue?: string;
  children: React.ReactNode;
}

const typeIcons: { [key: string]: React.ElementType } = {
  string: Type,
  boolean: ToggleRight,
  number: Hash,
  Color: Brush,
};

const Property: React.FC<PropertyProps> = ({
  name,
  type,
  defaultValue,
  children,
}) => {
  const Icon = typeIcons[type.toLowerCase()] || Hash;

  return (
    <div className="property-item py-3">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="text-base font-medium text-text-primary flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary-accent" />
          <code>{name}</code>
        </p>
        <div className="flex items-center gap-2 text-xs sm:text-sm pl-6 sm:pl-0">
          <span className="font-mono rounded-md bg-bg-inset px-2 py-0.5 border border-border-color text-text-secondary">
            {type}
          </span>
          {defaultValue && (
            <div className="flex items-center gap-1.5">
              <span className="text-text-secondary">Default:</span>
              <span className="font-mono rounded-md bg-bg-surface px-2 py-0.5 border border-border-color text-text-primary">
                {defaultValue}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="prose-styles mt-1 pl-6 text-sm text-text-secondary">
        {children}
      </div>
    </div>
  );
};

export default Property;