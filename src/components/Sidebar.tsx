import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, NavItem } from "@/config/siteConfig";

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
    <aside className="col-start-1 col-end-2 row-start-1 row-end-3 p-3 flex flex-col z-20">
      <div className="h-header flex-shrink-0 flex items-center px-3">
        <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-text-primary no-underline">
          <span className="inline-block w-6 h-6 bg-primary-accent mask-image-logo transition-transform duration-400 ease-out group-hover:rotate-12 group-hover:scale-110"></span>
          <span>VFX Studio</span>
        </Link>
      </div>
      <nav className="flex-grow overflow-y-auto py-4">
        {navigation.map((section, index) => (
          <div className="mb-6" key={index}>
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-4">{section.title}</h3>
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
      <div className="px-6 py-4 border-t border-border-color flex justify-center items-center">
        <span className="bg-bg-inset text-text-secondary text-xs font-medium px-2 py-1 rounded-md border border-border-color">v3.9.1</span>
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

  const linkClasses = `flex items-center gap-3.5 px-4 py-2.5 rounded-md text-text-secondary no-underline font-medium text-sm transition-colors duration-200 ease-in-out relative cursor-pointer select-none
    ${isActive ? 'bg-primary-accent text-text-on-accent font-semibold' : ''}
    ${isParentOfActive ? 'bg-primary-accent/10 text-text-primary' : ''}
    ${!isActive && !isParentOfActive ? 'hover:bg-bg-inset hover:text-text-primary' : ''}
  `;

  return (
    <li className="list-none">
      <Link
        href={item.href || "#"}
        className={linkClasses}
        onClick={handleToggle}
      >
        {item.icon && (
          <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-center" />
        )}
        <span>{item.title}</span>
        {hasChildren && (
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`ml-auto transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
          />
        )}
      </Link>
      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.ul
            className="list-none pl-6 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {item.children?.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={`block text-sm py-2 px-4 pl-9 rounded-md transition-colors duration-200 ease-in-out ${currentPath === child.href ? "text-primary-accent font-medium" : "text-text-secondary hover:text-text-primary"}`}
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