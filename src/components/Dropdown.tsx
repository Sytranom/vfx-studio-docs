'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string | number;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue: string | number;
  onSelect: (value: string | number) => void;
  label?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedValue, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(opt => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string | number) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm font-medium text-text-secondary">{label}:</span>}
      <div className="relative w-48" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-1.5 text-left bg-bg-surface border border-border-color rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-accent/70 transition-all"
        >
          <span>{selectedOption?.label || 'Select...'}</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} className="text-text-secondary" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (

<motion.div
              role="list"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute z-10 w-full mt-2 bg-bg-surface border border-border-color rounded-lg shadow-2xl max-h-60 overflow-y-auto focus:outline-none"
            >
              {options.map((option) => {
                const isSelected = option.value === selectedValue;
                return (

<div
                    key={option.value}
                    role="listitem"
                    onClick={() => handleSelect(option.value)}
                    className={`flex justify-center items-center px-4 py-2 cursor-pointer transition-colors duration-150 ${
                      isSelected
                        ? 'bg-primary-accent/20 text-text-primary font-semibold'
                        : 'text-text-secondary hover:bg-bg-inset hover:text-text-primary'
                    }`}
                  >
                    {option.label}
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dropdown;