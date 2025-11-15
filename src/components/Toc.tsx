import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { motion, useSpring } from "framer-motion";
import FontSizer from "./FontSizer";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const getHeadingLevel = (tagName: string): number => {
  if (tagName === "H1") return 1;
  if (tagName === "H2") return 2;
  return 3;
};

const Toc: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const router = useRouter();
  const tocNavRef = useRef<HTMLDivElement>(null);
  const headingElements = useRef<HTMLElement[]>([]);
  const ignoreScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const throttleWaitingRef = useRef(false);

const indicatorY = useSpring(0, { stiffness: 400, damping: 30 });
  const indicatorHeight = useSpring(24, { stiffness: 400, damping: 30 });

  useEffect(() => {
    const selector = ".doc-article h2, .doc-article h3";
    headingElements.current = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const newHeadings = headingElements.current.map((h) => ({
      id: h.id, text: h.textContent || "", level: getHeadingLevel(h.tagName)
    }));
    setHeadings(newHeadings);
    if (newHeadings.length > 0) setActiveId(newHeadings[0].id);
  }, [router.asPath]);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || headingElements.current.length === 0) return;

    const handleScroll = () => {
      if (ignoreScrollRef.current || throttleWaitingRef.current) return;
      throttleWaitingRef.current = true;

      setTimeout(() => {
        const isAtBottom = main.scrollHeight - main.scrollTop - main.clientHeight < 2;
        if (isAtBottom) {
          const lastId = headingElements.current[headingElements.current.length - 1]?.id;
          if (lastId) setActiveId(lastId);
        } else {
          const TOP_OFFSET = 120;
          let closestId = ""; let smallestDistance = Infinity;
          headingElements.current.forEach(h => {
            const dist = Math.abs(h.getBoundingClientRect().top - TOP_OFFSET);
            if (dist < smallestDistance) { smallestDistance = dist; closestId = h.id; }
          });
          if (closestId) setActiveId(closestId);
        }
        throttleWaitingRef.current = false;
      }, 60);
    };

    main.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => main.removeEventListener('scroll', handleScroll);
  }, [headings]);

useEffect(() => {
    const tocNav = tocNavRef.current;
    if (!tocNav || !activeId) return;
    const activeLinkEl = tocNav.querySelector(`a[href="#${activeId}"]`) as HTMLElement;
    if (activeLinkEl) {
      
      indicatorY.set(activeLinkEl.offsetTop);
      indicatorHeight.set(activeLinkEl.offsetHeight);
    }
  }, [activeId, indicatorY, indicatorHeight]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    ignoreScrollRef.current = true;
    setActiveId(id);
    
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    
    scrollTimeoutRef.current = setTimeout(() => {
      ignoreScrollRef.current = false;
    }, 800);
  };

  if (headings.length < 1) return null;

  return (
    <div className="sticky top-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-text-primary">On this page</h3>
        <FontSizer />
      </div>
      <nav ref={tocNavRef} className="relative border-l-2 border-border-color/50">
        <motion.div
          className="absolute w-[3px] bg-primary-accent rounded-full -left-[2.5px]"
          style={{ y: indicatorY, height: indicatorHeight }}
        />
        <ul className="space-y-1">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleLinkClick(e, h.id)}
                className={`block py-1 text-sm no-underline transition-colors duration-200 ${
                  h.level === 2 ? "pl-4" : "pl-8"
                } ${
                  activeId === h.id
                    ? "font-semibold text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Toc;