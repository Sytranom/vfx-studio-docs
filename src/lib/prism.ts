import { Prism } from 'prism-react-renderer';

// This function will be called in our CodeBlock component to ensure
// that the 'lua' language is loaded before we try to highlight it.
export const setupPrism = () => {
  // A check to see if we're in a browser environment.
  if (typeof window !== 'undefined') {
    // This is the standard way to extend Prism. We make Prism available globally
    // (for the language component to find), then import the language component,
    // which will automatically register itself with the Prism object.
    (window as any).Prism = Prism;
    require('prismjs/components/prism-lua');
  }
};