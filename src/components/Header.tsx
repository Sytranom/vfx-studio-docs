import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { headerLinks } from "@/config/siteConfig";
import { useSidebarStore } from "@/hooks/use-sidebar";
import { useSearchStore } from "@/hooks/use-search"; 
import Breadcrumbs from "./Breadcrumbs";

interface HeaderProps {
  breadcrumbs: string;
}

const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => {
  const { toggle } = useSidebarStore();
  const { open } = useSearchStore(); 

  return (
    <header className="sticky top-0 h-[60px] bg-bg-surface lg:relative lg:col-start-2 lg:row-start-1 flex items-center justify-between px-4 lg:px-6 z-10 border-b border-border-color lg:border-none">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="lg:hidden text-text-secondary text-xl w-9 h-9 grid place-items-center rounded-md hover:text-text-primary hover:bg-bg-main"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="hidden sm:block">
          <Breadcrumbs path={breadcrumbs} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {}
        <button 
          className="bg-bg-main border border-border-color text-text-secondary px-3 py-2 rounded-md flex items-center gap-2 text-sm cursor-pointer transition-all duration-200 ease-in-out hover:border-primary-accent hover:text-text-primary" 
          onClick={open}
        >
          <FontAwesomeIcon icon={faSearch} />
          <span className="hidden md:inline">Search...</span>
          <span className="bg-bg-surface px-2 py-1 rounded text-xs border border-border-color hidden sm:inline">Ctrl+K</span>
        </button>
        
        <div className="flex items-center gap-1">
          {headerLinks.map((link, index) => (
            <a
              href={link.href}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary text-xl w-9 h-9 grid place-items-center rounded-md hover:text-text-primary hover:bg-bg-main"
              title={link.title}
            >
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;