import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, NavItem, NavSection } from "@/config/siteConfig";
import { useSidebarStore } from "@/hooks/use-sidebar";
import { useNavigationStore } from "@/hooks/use-navigation-store";
import SidebarResizer from "./SidebarResizer";
import ThemeSwitcher from "./ThemeSwitcher";
import WidthToggler from "./WidthToggler";

const Sidebar: React.FC = () => {
  const { isOpen, close, width } = useSidebarStore();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => close();
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, close]);

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full bg-bg-surface
        z-30 transition-transform duration-300 ease-in-out
        lg:sticky lg:row-span-2 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      style={{ width: `${width}px` }}
    >
      <div className="flex flex-col h-full">
        <div className="h-[60px] flex-shrink-0 flex items-center px-3">
          <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-text-primary no-underline">
            <span className="inline-block w-6 h-6 bg-primary-accent logo-mask transition-transform duration-400 ease-out group-hover:rotate-12 group-hover:scale-110"></span>
            
            <span>VFX Studio</span>
          </Link>
        </div>
        <nav className="flex-grow overflow-y-auto overflow-x-hidden px-3">
          {navigation.map((section) => (
            <NavSectionComponent key={section.title} section={section} />
          ))}
        </nav>
        
        <div className="flex-shrink-0 p-3 border-t border-border-color">
          <div className="flex items-center justify-between">
            <span className="bg-bg-inset text-text-secondary text-xs font-medium px-2 py-1 rounded-md border border-border-color">
              v3.9.1
            </span>
            <div className="flex items-center gap-1">
              <ThemeSwitcher />
              <WidthToggler />
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block">
          <SidebarResizer />
      </div>
    </aside>
  );
};

const NavSectionComponent: React.FC<{ section: NavSection }> = ({ section }) => {
  const router = useRouter();
  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-3">{section.title}</h3>
      <ul>
        {section.links.map((link) => (
          <NavItemComponent
            key={link.title}
            item={link}
            currentPath={router.asPath}
          />
        ))}
      </ul>
    </div>
  );
};

const NavItemComponent: React.FC<{ item: NavItem; currentPath: string }> = ({
  item,
  currentPath,
}) => {
  const { openSections, toggleSection, setSectionOpen } = useNavigationStore();
  const [isMounted, setIsMounted] = useState(false);
  const hasBeenOpened = useRef(false);
  const childrenUListRef = useRef<HTMLUListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasChildren = item.children && item.children.length > 0;
  const isParentOfActive = item.children?.some((child) => child.href === currentPath) ?? false;
  
  const isInitiallyOpen = isParentOfActive;
  const clientIsOpen = openSections[item.title] ?? isInitiallyOpen;
  const isOpen = isMounted ? clientIsOpen : isInitiallyOpen;

  if (isOpen) {
    hasBeenOpened.current = true;
  }

  useEffect(() => {
    if (isParentOfActive) {
      setSectionOpen(item.title, true);
    }
  }, [isParentOfActive, item.title, setSectionOpen]);
  
  useEffect(() => {
    if (isOpen && childrenUListRef.current) {
      const links = Array.from(childrenUListRef.current.querySelectorAll('a'));

if (trackRef.current && links.length > 1) {
        const firstLink = links[0];
        const lastLink = links[links.length - 1];

const top = firstLink.offsetTop + firstLink.offsetHeight / 4.75;
        
        const bottom = lastLink.offsetTop + lastLink.offsetHeight / 1.25;

const height = bottom - top;

        trackRef.current.style.top = `${top}px`;
        trackRef.current.style.height = `${height}px`;
      }
      
      const activeLink = links.find(a => a.pathname === currentPath);
      if (activeLink) {
        const targetHeight = activeLink.offsetHeight * 0.6;
        const targetTop = activeLink.offsetTop + (activeLink.offsetHeight - targetHeight) / 2;
        setIndicatorStyle({ top: targetTop, height: targetHeight, opacity: 1 });
      }
    }
  }, [currentPath, isOpen, item.children]);

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      if (item.href === "#") e.preventDefault();
      toggleSection(item.title);
    }
  };

  const isActive = (!hasChildren && currentPath === item.href) || isParentOfActive;
  const isChildActive = (childHref: string) => currentPath === childHref;
  const linkClasses = `flex items-center gap-3.5 w-full py-2.5 px-3 rounded-md no-underline font-medium text-sm transition-colors duration-200 ease-in-out relative cursor-pointer select-none
    ${isActive ? 'bg-primary-accent/10 text-text-primary' : 'text-text-secondary hover:bg-bg-inset hover:text-text-primary'}
  `;

  const variants = {
    open: { height: "auto", opacity: 1 },
    closed: { height: 0, opacity: 0 },
  };

  return (
    <li className="list-none">
      <Link href={item.href || "#"} className={linkClasses} onClick={handleToggle}>
        {item.icon && (<span className="w-4 grid place-items-center"><FontAwesomeIcon icon={item.icon} /></span>)}
        <span className="flex-grow fade-truncate">{item.title}</span>
        {hasChildren && (
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`
              ml-auto duration-300
              ${isOpen ? "rotate-90" : ""}
              ${isMounted ? "transition-transform" : ""}
            `}
          />
        )}
      </Link>
      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            className="overflow-hidden pl-7"
            key="content"
            initial={hasBeenOpened.current ? "open" : "closed"}
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ul ref={childrenUListRef} className="list-none relative py-1">
              <div 
                ref={trackRef} 
                className="absolute w-[2px] bg-border-color/50"
                style={{ left: '-1px' }}
              />
              
              <AnimatePresence>
                {isParentOfActive && (
                  <motion.div
                    layoutId="active-sidebar-indicator"
                    className="absolute w-[3px] bg-primary-accent rounded-full"
                    initial={false}
                    animate={indicatorStyle}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    style={{ left: '-1.5px' }}
                  />
                )}
              </AnimatePresence>

              {item.children?.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className={`block text-sm py-2 pl-4 rounded-md transition-colors duration-200 ease-in-out fade-truncate ${
                      isChildActive(child.href) 
                        ? "text-primary-accent font-semibold" 
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-inset"
                    }`}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default Sidebar;