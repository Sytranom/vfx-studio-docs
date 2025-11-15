import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export const useScrollToTop = () => {
  const router = useRouter();
  
  const scrollableElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    
    const handleRouteChangeComplete = () => {
      const element = scrollableElementRef.current;
      if (element) {
        
        element.scrollTop = 0;
      }
    };

router.events.on('routeChangeComplete', handleRouteChangeComplete);

return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]); 

return scrollableElementRef;
};