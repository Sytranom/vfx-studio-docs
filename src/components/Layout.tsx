import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Toc from "./Toc";
import SearchModal from "./SearchModal";
import Seo from "./Seo";
import MobileOverlay from "./MobileOverlay";
import Footer from "./Footer";
import { useSidebarStore, SIDEBAR_STORAGE_KEY } from "@/hooks/use-sidebar";
import { useContentWidthStore } from "@/hooks/use-content-width";

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs: string;
  title: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  breadcrumbs,
  title,
  description,
}) => {
  const { isOpen, close, width: sidebarWidth, setWidth } = useSidebarStore();
  const { width: contentWidth } = useContentWidthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (storedValue) {
        setWidth(parseInt(storedValue, 10));
      }
    } catch (error) {
      console.error("Failed to hydrate sidebar width from localStorage", error);
    }
    
    setIsMounted(true);
    
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      close();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, close]);

  // --- THIS IS THE FIX ---
  // This useEffect runs on the client-side after the page content has rendered.
  // It depends on `router.asPath`, so it will re-run every time you navigate to a new page.
  useEffect(() => {
    // Find all h2 and h3 elements within the main article container.
    const headers = document.querySelectorAll<HTMLElement>('.doc-article h2, .doc-article h3');
    
    headers.forEach(header => {
      // For each header, check if it has an ID (it should, thanks to rehype-slug).
      if (header.id) {
        // Create a new anchor link element.
        const anchor = document.createElement('a');
        anchor.className = 'anchor'; // This is the class our CSS targets.
        anchor.href = `#${header.id}`;
        anchor.setAttribute('aria-hidden', 'true');
        
        // This is the clever part: move all of the header's existing content
        // INSIDE our new anchor link.
        while (header.firstChild) {
          anchor.appendChild(header.firstChild);
        }
        
        // Finally, put the anchor link (which now contains the original text)
        // back inside the now-empty header.
        header.appendChild(anchor);
      }
    });

    // The function returns a "cleanup" function. This runs before the effect runs again.
    // It finds all the links we just created and reverts them, preventing duplicate links on fast re-renders.
    return () => {
      document.querySelectorAll<HTMLAnchorElement>('.doc-article h2 a.anchor, .doc-article h3 a.anchor').forEach(anchor => {
        const header = anchor.parentElement;
        if (header) {
          while (anchor.firstChild) {
            header.insertBefore(anchor.firstChild, anchor);
          }
          header.removeChild(anchor);
        }
      });
    };
  }, [router.asPath]); // Re-run this logic on every page navigation.
  // --- END OF FIX ---

  const contentWidthClass = {
    normal: 'max-w-3xl',
    wide: 'max-w-5xl',
    fluid: 'max-w-full px-4',
  }[contentWidth];

  return (
    <div
      className={`
        relative h-screen bg-bg-surface lg:grid lg:grid-rows-[60px_1fr]
        transition-opacity duration-300 ease-in-out
        ${isMounted ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ gridTemplateColumns: `${sidebarWidth}px 1fr` }}
    >
      <Seo title={title} description={description} />
      <Sidebar />
      <MobileOverlay isSidebarOpen={isOpen} onClick={close} />
      
      <Header breadcrumbs={breadcrumbs} />

      <main 
        className="bg-bg-main lg:col-start-2 lg:row-start-2 lg:border-t lg:border-l lg:border-border-color lg:rounded-tl-lg overflow-auto min-w-0"
      >
        <motion.div
          key={router.asPath}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="flex justify-center p-6 md:p-12 gap-x-12">
            <div className={`w-full flex-shrink-0 ${contentWidthClass}`}>
              {children}
              <Footer />
            </div>
            <div className="hidden lg:block w-[240px] flex-shrink-0">
              <Toc />
            </div>
          </div>
        </motion.div>
      </main>
      
      <SearchModal />
    </div>
  );
};

export default Layout;