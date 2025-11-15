import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTextHeight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

type TextSizeType = 'sm' | 'base' | 'lg' | 'xl';
const SIZES: TextSizeType[] = ['sm', 'base', 'lg', 'xl'];

const FontSizer = () => {
  const [mounted, setMounted] = useState(false);
  
  const [currentSize, setCurrentSize] = useState<TextSizeType>('base');

useEffect(() => {
    
    const initialSize = document.documentElement.dataset.textSize as TextSizeType | undefined;
    if (initialSize && SIZES.includes(initialSize)) {
      setCurrentSize(initialSize);
    }
    setMounted(true);
  }, []);

  const setSize = (size: TextSizeType) => {
    document.documentElement.dataset.textSize = size;
    setCurrentSize(size);
  };

  const handleIncrease = () => {
    const currentIndex = SIZES.indexOf(currentSize);
    if (currentIndex < SIZES.length - 1) {
      setSize(SIZES[currentIndex + 1]);
    }
  };

  const handleDecrease = () => {
    const currentIndex = SIZES.indexOf(currentSize);
    if (currentIndex > 0) {
      setSize(SIZES[currentIndex - 1]);
    }
  };

if (!mounted) {
    return <div style={{width: '84px', height: '28px'}} />;
  }

const canDecrease = currentSize !== 'sm';
  const canIncrease = currentSize !== 'xl';

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleDecrease}
        disabled={!canDecrease}
        className="text-text-secondary text-lg w-7 h-7 grid place-items-center rounded-md hover:text-text-primary enabled:hover:bg-bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease font size"
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <FontAwesomeIcon icon={faTextHeight} className="text-text-secondary" />
      <button
        onClick={handleIncrease}
        disabled={!canIncrease}
        className="text-text-secondary text-lg w-7 h-7 grid place-items-center rounded-md hover:text-text-primary enabled:hover:bg-bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase font size"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default FontSizer;