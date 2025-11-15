'use client';

import React, { useState, useEffect } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';
import { setupPrism } from '@/lib/prism';
import { useTheme } from 'next-themes'; 

setupPrism();

const CodeBlock = ({ children, className: outerClassName }: { children: string; className?: string }) => {
  const language = outerClassName?.replace(/language-/, '') || 'bash';
  const fileNameMatch = outerClassName?.match(/filename="([^"]+)"/);
  const fileName = fileNameMatch ? fileNameMatch[1] : null;
  const [isCopied, setIsCopied] = useState(false);

const { theme } = useTheme();

const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleCopy = () => {
    const codeToCopy = children.trim();
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

if (!mounted) {
    return (
      <div className="relative my-6 rounded-lg border border-border-color bg-bg-surface group overflow-hidden">
        <div className="p-4" style={{ minHeight: '80px' }}></div>
      </div>
    );
  }

  return (
    <div className="relative my-6 rounded-lg border border-border-color group overflow-hidden">
      {fileName && (
        <div className="text-sm px-4 py-2 font-mono text-text-secondary border-b border-border-color bg-bg-inset">
          {fileName}
        </div>
      )}

      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 p-1.5 bg-bg-inset border border-border-color rounded-md text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-accent"
        aria-label="Copy code to clipboard"
      >
        {isCopied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
      </button>

      <Highlight
        
        theme={theme === 'dark' ? themes.vsDark : themes.github}
        code={children.trim()}
        language={language}
      >
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${highlightClassName} p-4 text-sm overflow-x-auto`}
            style={{
              ...style,
              fontFamily: 'var(--font-mono)',
              
              backgroundColor: style.backgroundColor,
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;