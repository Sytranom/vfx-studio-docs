import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import FontSizer from "./FontSizer";

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
  const [editUrl, setEditUrl] = useState<string | null>(null);

  useEffect(() => {
    const GITHUB_BASE_URL = 'https://github.com/Sytranom/vfx-studio-docs/edit/main';
    const currentPath = router.asPath.split('#')[0];
    let fileToEdit = '';

    if (currentPath.startsWith('/docs/')) {
      const slug = currentPath.replace('/docs/', '');
      fileToEdit = `/_docs/${slug}.mdx`;
    } else if (currentPath.startsWith('/tutorials/')) {
      const slug = currentPath.replace('/tutorials/', '');
      fileToEdit = `/src/pages/tutorials/${slug}.tsx`;
    } else if (currentPath.startsWith('/guides/')) {
        const slug = currentPath.replace('/guides/', '');
        fileToEdit = `/src/pages/guides/${slug}.tsx`;
    }

    if (fileToEdit) {
      setEditUrl(`${GITHUB_BASE_URL}${fileToEdit}`);
    } else {
      setEditUrl(null);
    }

    if (observer.current) observer.current.disconnect();

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    };

    observer.current = new IntersectionObserver(handleObserver, { rootMargin: "-20% 0% -80% 0px", threshold: 1.0 });

    const headingElements = Array.from(document.querySelectorAll<HTMLElement>(".doc-article h2, .doc-article h3"));
    setHeadings(
      headingElements.map((h) => {
        if(observer.current) observer.current.observe(h);
        return { id: h.id, text: h.textContent || "", level: h.tagName === "H2" ? 2 : 3 };
      })
    );
    
    return () => {
        if (observer.current) observer.current.disconnect();
    }
  }, [router.asPath]);

  return (
    <div className="sticky top-12">
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-text-primary">
            On this page
          </h3>
          <FontSizer />
      </div>
      {headings.length > 0 && (
          <ul className="space-y-2 border-l-2 border-border-color">
            {headings.map((h) => (
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
            ))}
          </ul>
      )}

      {editUrl && (
        <a
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mt-8"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          <span>Edit this page on GitHub</span>
        </a>
      )}
    </div>
  );
};

export default Toc;