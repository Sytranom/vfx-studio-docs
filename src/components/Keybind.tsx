import React from 'react';

const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <kbd className="px-2 py-1 text-sm font-semibold text-text-primary bg-bg-inset border border-border-color rounded-md">
      {children}
    </kbd>
  );
};

interface KeybindProps {
  keys: string[];
}

const Keybind: React.FC<KeybindProps> = ({ keys }) => {
  return (
    <div className="inline-flex items-center gap-2">
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-text-secondary">+</span>}
          <Kbd>{key}</Kbd>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Keybind;