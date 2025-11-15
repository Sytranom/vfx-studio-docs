'use client';

import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';
import { setupPrism } from '@/lib/prism';

// Run the setup function once when the component module is loaded.
setupPrism();

const CodeBlock = ({ children, className: outerClassName }: { children: string; className?: string }) => {
  const language = outerClassName?.replace(/language-/, '') || 'bash';
  const fileNameMatch = outerClassName?.match(/filename="([^"]+)"/);
  const fileName = fileNameMatch ? fileNameMatch[1] : null;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const codeToCopy = children.trim();
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  return (
    // THIS IS THE FIX: Added `overflow-hidden` to the main container.
    // This class will clip the sharp corners of the inner <pre> tag's background.
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
        theme={themes.vsDark}
        code={children.trim()}
        language={language}
      >
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${highlightClassName} p-4 text-sm overflow-x-auto`}
            style={{
              ...style,
              fontFamily: 'var(--font-mono)',
              // The background is now applied directly here. Its corners will be clipped by the parent.
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