import React, { useState, useEffect, useCallback } from 'react';
import { useSidebarStore } from '@/hooks/use-sidebar';

const SidebarResizer: React.FC = () => {
  const { setWidth } = useSidebarStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setWidth(e.clientX);
  }, [setWidth]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute top-0 -right-2 h-full w-4 cursor-col-resize z-40 flex justify-center items-center group"
    >
      <div
        className={`
          h-full w-0.5 bg-primary-accent
          transition-all duration-200
          ${isHovered || isDragging ? 'opacity-100 scale-x-150' : 'opacity-0 scale-x-100'}
        `}
      />
    </div>
  );
};

export default SidebarResizer;