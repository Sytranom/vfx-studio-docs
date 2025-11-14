import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Toc from "./Toc";
import SearchModal from "./SearchModal";
import Seo from "./Seo";

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
  return (
    <div className="grid grid-cols-[280px_1fr] grid-rows-[60px_1fr] h-screen">
      <Seo title={title} description={description} />
      <Sidebar />
      <Header breadcrumbs={breadcrumbs} />
      {/* The main content area now scrolls the whole page */}
      <main className="col-start-2 col-end-3 row-start-2 row-end-3 bg-bg-main border-t border-l border-border-color rounded-tl-lg overflow-y-auto">
        {/* This inner div now uses a flex layout to position the article and TOC */}
        <div className="flex justify-center p-12">
          <div className="w-full max-w-3xl">
            {children}
          </div>
          <div className="hidden lg:block w-[240px] ml-12 flex-shrink-0">
            <Toc />
          </div>
        </div>
      </main>
      <SearchModal />
    </div>
  );
};

export default Layout;