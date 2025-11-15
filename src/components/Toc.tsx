import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
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
  const headingsRef = useRef<HTMLElement[]>([]);

useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll<HTMLElement>(".doc-article h1, .doc-article h2, .doc-article h3")
    );
    
    headingsRef.current = headingElements;
    const newHeadings = headingElements.map((h) => ({
      id: h.id,
      text: h.textContent || "",
      level: getHeadingLevel(h.tagName),
    }));
    
    setHeadings(newHeadings);

setActiveId(newHeadings[0]?.id || "");

  }, [router.asPath]);

useEffect(() => {
    const scrollContainer = document.querySelector('main');
    if (!scrollContainer || headings.length === 0) return;
    
    let timeoutId: number | null = null;
    
    const handleScroll = () => {
      
      const isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight < 20;
      if (isAtBottom) {
        const lastHeadingId = headingsRef.current[headingsRef.current.length - 1]?.id;
        if (lastHeadingId) {
            setActiveId(lastHeadingId);
            return;
        }
      }

const TOP_OFFSET = 100; 
      let currentBestId = headingsRef.current[0]?.id || ""; 

for (const heading of [...headingsRef.current].reverse()) {
        if (heading.getBoundingClientRect().top < TOP_OFFSET) {
          currentBestId = heading.id;
          break;
        }
      }
      setActiveId(currentBestId);
    };
    
    const throttledScrollHandler = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };
    
    scrollContainer.addEventListener('scroll', throttledScrollHandler);
    handleScroll(); 

    return () => {
      scrollContainer.removeEventListener('scroll', throttledScrollHandler);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [headings]); 

if (headings.length < 2) {
    return null;
  }

  return (
    <div className="sticky top-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-text-primary">
          On this page
        </h3>
        <FontSizer />
      </div>
      <ul className="space-y-2 border-l-2 border-border-color">
        {headings.map((h) => {
          
          if (h.level === 1) return null;
          
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`
                  block py-1 -ml-0.5 text-sm no-underline border-l-2 transition-all duration-200
                  ${h.level === 2 ? "pl-4" : "pl-8"}
                  ${activeId === h.id ? "font-semibold text-primary-accent border-primary-accent" : "text-text-secondary border-transparent hover:text-text-primary hover:border-text-secondary"}
                `}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Toc;