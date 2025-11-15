'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import { motion, Easing } from 'framer-motion';

interface EasingOption {
  value: string;
  label: string;
  description: string;
  motionValue: Easing;
}

const parseBezierForMotion = (css: string): Easing => {
  if (css === 'linear') {
    return 'linear';
  }
  const match = css.match(/cubic-bezier\(([^)]+)\)/);
  if (!match) {
    return 'linear'; 
  }

  const numbers = match[1].split(',').map(s => parseFloat(s.trim()));

if (numbers.length === 4 && numbers.every(n => !isNaN(n))) {
    
    return numbers as [number, number, number, number];
  }

console.warn(`Invalid cubic-bezier string found: "${css}". Falling back to linear.`);
  return 'linear';
};

const EASING_OPTIONS: EasingOption[] = [
  { value: 'linear', label: 'Linear', motionValue: 'linear', description: 'Moves at a constant speed.' },
  { value: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)', label: 'Quad', motionValue: parseBezierForMotion('cubic-bezier(0.55, 0.085, 0.68, 0.53)'), description: 'A gentle acceleration curve (the default).' },
  { value: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)', label: 'Cubic', motionValue: parseBezierForMotion('cubic-bezier(0.55, 0.055, 0.675, 0.19)'), description: 'A slightly more exaggerated curve.' },
  { value: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)', label: 'Quart', motionValue: parseBezierForMotion('cubic-bezier(0.895, 0.03, 0.685, 0.22)'), description: 'A powerful acceleration curve.' },
  { value: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)', label: 'Quint', motionValue: parseBezierForMotion('cubic-bezier(0.755, 0.05, 0.855, 0.06)'), description: 'The most powerful standard curve.' },
  { value: 'cubic-bezier(0.12, 0, 0.39, 0)', label: 'Sine', motionValue: parseBezierForMotion('cubic-bezier(0.12, 0, 0.39, 0)'), description: 'A smooth, sinusoidal curve.' },
  { value: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)', label: 'Expo', motionValue: parseBezierForMotion('cubic-bezier(0.95, 0.05, 0.795, 0.035)'), description: 'Extremely fast acceleration and a sudden stop.' },
  { value: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)', label: 'Circ', motionValue: parseBezierForMotion('cubic-bezier(0.6, 0.04, 0.98, 0.335)'), description: 'A circular curve, good for UI animations.' },
  { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', label: 'Elastic', motionValue: parseBezierForMotion('cubic-bezier(0.68, -0.55, 0.265, 1.55)'), description: 'An elastic "bouncing" effect at the end.' },
  { value: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)', label: 'Back', motionValue: parseBezierForMotion('cubic-bezier(0.6, -0.28, 0.735, 0.045)'), description: 'Overshoots the target slightly before settling.' },
  { value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', label: 'Bounce', motionValue: parseBezierForMotion('cubic-bezier(0.175, 0.885, 0.32, 1.275)'), description: 'Bounces to a rest, like a dropped ball.' },
];

const getPathForTimingFunction = (timing: string): string => {
  if (typeof timing !== 'string' || !timing.startsWith('cubic-bezier')) {
    return "M 0 100 L 100 0";
  }
  const points = timing.match(/-?[\d.]+/g)?.map(Number);
  if (!points || points.length !== 4) {
    return "M 0 100 L 100 0";
  }
  const [p1x, p1y, p2x, p2y] = points;
  return `M 0 100 C ${p1x * 100} ${100 - p1y * 100}, ${p2x * 100} ${100 - p2y * 100}, 100 0`;
};

const EasingVisualizer: React.FC = () => {
  const [selectedEaseValue, setSelectedEaseValue] = useState<string>(EASING_OPTIONS[1].value);
  const [previewWidth, setPreviewWidth] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentEase = useMemo(() => {
    return EASING_OPTIONS.find(opt => opt.value === selectedEaseValue) || EASING_OPTIONS[0];
  }, [selectedEaseValue]);

  useEffect(() => {
    const measureWidth = () => {
      if (previewRef.current) {
        setPreviewWidth(previewRef.current.offsetWidth);
      }
    };
    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => {
      window.removeEventListener('resize', measureWidth);
    };
  }, []);

  return (
    <>
      <style>{`
        .easing-visualizer {
          background-color: var(--color-bg-surface);
          border: 1px solid var(--color-border-color);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .easing-visualizer__header {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--color-border-color);
          background-color: var(--color-bg-inset);
        }
        .easing-visualizer__content {
          padding: 1.5rem 1.25rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .easing-visualizer__content {
            grid-template-columns: 1fr 200px;
          }
        }
        .easing-visualizer__description {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        .easing-visualizer__graph {
          background-color: var(--color-bg-inset);
          border-radius: 0.375rem;
          border: 1px solid var(--color-border-color);
        }
        .easing-visualizer__preview {
          width: 100%;
          height: 2.5rem;
          padding: 0 0.5rem;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          margin-top: 1rem;
        }
        .easing-visualizer__dot {
          width: 24px;
          height: 24px;
          background-color: var(--color-primary-accent);
          border-radius: 50%;
        }
      `}</style>
      <div className="easing-visualizer">
        <div className="easing-visualizer__header">
          <Dropdown
            label="Easing Style"
            options={EASING_OPTIONS.map(({ value, label }) => ({ value, label }))}
            selectedValue={selectedEaseValue}
            onSelect={(value) => setSelectedEaseValue(value as string)}
          />
        </div>

        <div className="easing-visualizer__content">
          <div>
            <p className="easing-visualizer__description">{currentEase.description}</p>
            <div className="easing-visualizer__preview" ref={previewRef}>
              {previewWidth > 0 && (
                <motion.div
                  key={currentEase.value}
                  className="easing-visualizer__dot"
                  animate={{
                    translateX: ["0px", `${previewWidth - 24}px`],
                  }}
                  transition={{
                    duration: 2.5,
                    ease: currentEase.motionValue,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1
                  }}
                />
              )}
            </div>
          </div>
          <svg
            className="easing-visualizer__graph"
            viewBox="-10 -10 120 120"
            preserveAspectRatio="none"
          >
            <path d="M 0 0 L 0 100 L 100 100" fill="none" stroke="var(--color-border-color)" strokeWidth="1" />
            <path
              d={getPathForTimingFunction(currentEase.value)}
              fill="none"
              stroke="var(--color-primary-accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default EasingVisualizer;