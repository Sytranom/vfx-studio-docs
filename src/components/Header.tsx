import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { headerLinks } from "@/config/siteConfig";

interface HeaderProps {
  breadcrumbs: string;
}

const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => {
  const handleSearchClick = () => {
    document.getElementById("search-modal-overlay")?.classList.add("visible");
    (document.getElementById("search-input") as HTMLInputElement)?.focus();
  };

  return (
    <header className="col-start-2 col-span-2 row-start-1 row-span-1 flex items-center justify-between px-6 py-0 z-10">
      <div className="text-text-secondary font-medium text-sm">
        {breadcrumbs}
      </div>
      <div className="flex items-center gap-3">
        <button className="bg-bg-main border border-border-color text-text-secondary px-3 py-2 rounded-md flex items-center gap-3 text-sm cursor-pointer transition-all duration-200 ease-in-out hover:border-primary-accent hover:text-text-primary" onClick={handleSearchClick}>
          <i className="fa-solid fa-search"></i>
          <span>Search...</span>
          <span className="bg-bg-surface px-2 py-1 rounded text-xs border border-border-color">Ctrl+K</span>
        </button>
        <div className="flex items-center gap-1">
          {headerLinks.map((link, index) => (
            <a
              href={link.href}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary text-xl w-9 h-9 grid place-items-center rounded-md transition-colors duration-200 ease-in-out hover:text-text-primary hover:bg-bg-main"
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