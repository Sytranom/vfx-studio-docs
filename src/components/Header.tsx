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
    <header className="main-header">
      <div className="breadcrumbs" id="breadcrumbs">
        {breadcrumbs}
      </div>
      <div className="header-actions">
        <button className="search-btn" onClick={handleSearchClick}>
          <i className="fa-solid fa-search"></i>
          <span>Search...</span>
          <span className="hotkey">Ctrl+K</span>
        </button>
        <div className="header-links">
          {headerLinks.map((link, index) => (
            <a
              href={link.href}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="header-link-btn"
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
