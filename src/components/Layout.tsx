import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Toc from "./Toc";
import SearchModal from "./SearchModal";
import Seo from "./Seo";
import MobileOverlay from "./MobileOverlay";
import SidebarResizer from "./SidebarResizer";
import { useSidebarStore } from "@/hooks/use-sidebar";
import { useContentWidthStore } from "@/hooks/use-content-width";
import { useRouter } from "next/router";

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
  const { isOpen, close, width: sidebarWidth } = useSidebarStore();
  const { width: contentWidth } = useContentWidthStore();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      close();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, close]);

  const contentWidthClass = {
    normal: 'max-w-3xl',
    wide: 'max-w-5xl',
    fluid: 'max-w-full px-4',
  }[contentWidth];

  return (
    <div
      className="relative h-screen bg-bg-surface lg:grid lg:grid-rows-[60px_1fr]"
      style={{ gridTemplateColumns: `${sidebarWidth}px 1fr` }}
    >
      <Seo title={title} description={description} />
      <Sidebar />
      <MobileOverlay isSidebarOpen={isOpen} onClick={close} />

      <Header breadcrumbs={breadcrumbs} />

      <main 
        className="bg-bg-main lg:col-start-2 lg:row-start-2 lg:border-t lg:border-l lg:border-border-color lg:rounded-tl-lg overflow-auto min-w-0"
      >
        <div className="flex justify-center p-6 md:p-12 gap-x-12">
          <div className={`w-full flex-shrink-0 ${contentWidthClass}`}>
            {children}
          </div>
          <div className="hidden lg:block w-[240px] flex-shrink-0">
            <Toc />
          </div>
        </div>
      </main>
      
      <SearchModal />
    </div>
  );
};

export default Layout;