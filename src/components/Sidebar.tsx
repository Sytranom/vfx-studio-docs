import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, NavItem } from "@/config/siteConfig";
// The TOC component is no longer needed here

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link href="/" className="logo">
          <span className="logo-icon"></span>
          <span>VFX Studio</span>
        </Link>
      </div>
      <nav className="main-nav">
        {navigation.map((section, index) => (
          <div className="nav-section" key={index}>
            <h3 className="nav-section-title">{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <NavItemComponent
                  key={link.title}
                  item={link}
                  currentPath={router.pathname}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span className="version-tag">v3.9.1</span>
      </div>
    </aside>
  );
};

const NavItemComponent: React.FC<{ item: NavItem; currentPath: string }> = ({
  item,
  currentPath,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const isParentOfActive =
    hasChildren && item.children.some((child) => child.href === currentPath);

  const [isOpen, setIsOpen] = useState(isParentOfActive);
  const prevIsParentOfActive = usePrevious(isParentOfActive);

  useEffect(() => {
    if (!prevIsParentOfActive && isParentOfActive) {
      setIsOpen(true);
    }
  }, [isParentOfActive, prevIsParentOfActive]);

  const isActive = !hasChildren && currentPath === item.href;

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      if (item.href === "#") e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className="nav-item">
      <Link
        href={item.href || "#"}
        className={`nav-link ${isActive ? "active" : ""} ${isParentOfActive ? "active-parent" : ""}`}
        onClick={handleToggle}
      >
        {/* FIX: Only render the icon if it exists */}
        {item.icon && (
          <FontAwesomeIcon icon={item.icon} className="nav-link-icon" />
        )}
        <span>{item.title}</span>
        {hasChildren && (
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`chevron-icon ${isOpen ? "open" : ""}`}
          />
        )}
      </Link>
      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.ul
            className="sub-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {item.children?.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={`nav-link sub-nav-link ${currentPath === child.href ? "active" : ""}`}
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default Sidebar;
