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

import { useScrollToTop } from "@/hooks/use-scroll-to-top";

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

const mainScrollRef = useScrollToTop();

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

      {}
      <main 
        ref={mainScrollRef}
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