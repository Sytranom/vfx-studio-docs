import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const Toc: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const router = useRouter();
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Disconnect the old observer when the component re-renders
    if (observer.current) {
      observer.current.disconnect();
    }

    // This function will be called when a heading enters or leaves the viewport
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    // Create the IntersectionObserver
    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "-20% 0% -80% 0px", // Highlight when heading is in the top 20% of the screen
      threshold: 1.0,
    });

    const headingElements = Array.from(
      document.querySelectorAll<HTMLElement>(".doc-article h2, .doc-article h3")
    );

    setHeadings(
      headingElements.map((h) => {
        // Observe each heading element
        if(observer.current) {
            observer.current.observe(h);
        }
        return {
          id: h.id,
          text: h.textContent || "",
          level: h.tagName === "H2" ? 2 : 3,
        };
      })
    );
    
    // Cleanup function to disconnect the observer
    return () => {
        if (observer.current) {
            observer.current.disconnect();
        }
    }
  }, [router.asPath]); // Rerun this effect when the page changes

  if (headings.length === 0) {
    return null; // Don't render anything if there are no headings
  }

  return (
    <div className="sticky top-12">
      <h3 className="text-sm font-semibold mb-4 text-text-primary">
        On this page
      </h3>
      <ul className="space-y-2 border-l-2 border-border-color">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`
                block py-1 -ml-0.5 text-sm no-underline border-l-2
                transition-all duration-200
                ${h.level === 2 ? "pl-4" : "pl-8"}
                ${
                  activeId === h.id
                    ? "font-semibold text-primary-accent border-primary-accent"
                    : "text-text-secondary border-transparent hover:text-text-primary hover:border-text-secondary"
                }
              `}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toc;