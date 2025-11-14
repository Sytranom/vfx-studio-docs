import React from 'react';

interface MobileOverlayProps {
  isSidebarOpen: boolean;
  onClick: () => void;
}

const MobileOverlay: React.FC<MobileOverlayProps> = ({ isSidebarOpen, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        fixed inset-0 z-20 bg-black/50 backdrop-blur-sm
        transition-opacity duration-300 ease-in-out
        lg:hidden
        ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    />
  );
};

export default MobileOverlay;