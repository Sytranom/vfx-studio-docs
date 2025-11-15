import { Prism } from 'prism-react-renderer';

export const setupPrism = () => {
  
  if (typeof window !== 'undefined') {

(window as any).Prism = Prism;
    require('prismjs/components/prism-lua');
  }
};