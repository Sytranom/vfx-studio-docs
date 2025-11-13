import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Toc from "./Toc";
import SearchModal from "./SearchModal";
import Seo from "./Seo"; // Import the new component

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs: string;
  // Add title and description props
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
    <div className="site-container">
      <Seo title={title} description={description} />
      <Sidebar />
      <Header breadcrumbs={breadcrumbs} />
      <main className="main-content-wrapper">
        <div className="main-content" id="main-content">
          {children}
        </div>
      </main>
      <Toc />
      <SearchModal />
    </div>
  );
};

export default Layout;
