import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import MiniSearch, { SearchResult } from "minisearch";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTurnUp, faFileLines, faHashtag } from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import { useSearchStore } from "@/hooks/use-search";

interface SearchDoc {
  id: number;
  url: string;
  title: string;
  breadcrumbs: string;
  content: string;
  type?: 'Page' | 'Section' | 'Subsection';
}

const HighlightedText = ({ text, query, className = "" }: { text: string; query: string; className?: string }) => {
  if (!query) return <span className={className}>{text}</span>;

  const terms = query.split(/\s+/).filter(t => t.length > 0).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (terms.length === 0) return <span className={className}>{text}</span>;
  
  const regex = new RegExp(`(${terms.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="text-primary-accent underline decoration-primary-accent/50 underline-offset-2 font-semibold bg-primary-accent/10 rounded-sm px-0.5">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const SearchModal: React.FC = () => {
  const router = useRouter();
  const { isOpen, close, open } = useSearchStore();
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<(SearchResult & SearchDoc)[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [miniSearch, setMiniSearch] = useState<MiniSearch<SearchDoc> | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

useEffect(() => {
    const searchEngine = new MiniSearch<SearchDoc>({
      fields: ['title', 'content', 'breadcrumbs'],
      storeFields: ['title', 'breadcrumbs', 'url', 'content', 'type'],
      searchOptions: {
        boost: { title: 4, breadcrumbs: 2, content: 1 },
        prefix: true,
        fuzzy: (term) => term.length > 5 ? 0.35 : (term.length > 3 ? 0.2 : false),
        weights: { fuzzy: 0.4, prefix: 0.3 }
      }
    });

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    
    fetch(`${basePath}/search.json`)
      .then(res => res.json())
      .then((docs) => {
        searchEngine.addAll(docs);
        setMiniSearch(searchEngine);
      })
      .catch(err => console.error("[SearchModal] Failed to load search index", err));
  }, []);

useEffect(() => {
    if (!miniSearch || !query) {
      setResults([]);
      return;
    }
    const searchResults = miniSearch.search(query);
    setResults(searchResults as (SearchResult & SearchDoc)[]);
    setSelectedIndex(0);
  }, [query, miniSearch]);

useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) close(); else open();
      }
      if (e.key === "Escape" && isOpen) {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, open, close]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) < results.length ? prev + 1 : prev);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1) >= 0 ? prev - 1 : prev);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        navigateToResult(results[selectedIndex].url);
      }
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

const navigateToResult = (url: string) => {
    const cleanQuery = query.trim();
    let finalUrl = url;

    if (cleanQuery) {
      
      const separator = finalUrl.includes('?') ? '&' : '?';
      finalUrl = `${finalUrl}${separator}highlight=${encodeURIComponent(cleanQuery)}`;
    }

    router.push(finalUrl);
    close();
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-[12vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-bg-surface rounded-xl shadow-2xl border border-border-color flex flex-col overflow-hidden max-h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-5 py-4 border-b border-border-color">
              <FontAwesomeIcon icon={faSearch} className="text-primary-accent text-lg mr-4" />
              <input
                ref={inputRef}
                type="text"
                className="flex-grow bg-transparent border-none outline-none text-text-primary text-xl placeholder-text-secondary/50 font-medium h-full"
                placeholder="Search documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              <div className="hidden sm:flex items-center gap-2 text-xs text-text-secondary font-mono bg-bg-inset px-2 py-1 rounded border border-border-color">
                <span>ESC</span>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-2 bg-bg-surface/50 custom-scrollbar">
              {results.length > 0 ? (
                <ul ref={listRef} className="space-y-1">
                  {results.map((result, index) => {
                    const isSection = result.type === 'Section' || result.type === 'Subsection';
                    return (
                      <li key={result.id} 
                        role="option"
                        aria-selected={index === selectedIndex}
                      >
                        <button
                          onClick={() => navigateToResult(result.url)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={cx(
                            "w-full text-left px-4 py-3 rounded-lg transition-colors duration-150 flex items-start gap-4 group",
                            index === selectedIndex 
                              ? "bg-primary-accent/10" 
                              : "hover:bg-bg-inset"
                          )}
                        >
                          <div className={cx(
                            "mt-1 w-5 h-5 flex-shrink-0 flex items-center justify-center rounded",
                            index === selectedIndex ? "text-primary-accent" : "text-text-secondary"
                          )}>
                            <FontAwesomeIcon icon={isSection ? faHashtag : faFileLines} />
                          </div>

                          <div className="flex-grow min-w-0">
                            <div className="text-xs text-text-secondary mb-0.5 flex items-center gap-1">
                              <HighlightedText text={result.breadcrumbs} query={query} className="opacity-80" />
                            </div>
                            
                            <div className={cx(
                              "text-base font-semibold mb-1 truncate",
                              index === selectedIndex ? "text-primary-accent" : "text-text-primary"
                            )}>
                              <HighlightedText text={result.title} query={query} />
                            </div>

                            <div className="text-sm text-text-secondary line-clamp-1 break-all opacity-80">
                              <HighlightedText text={result.content.substring(0, 120)} query={query} />
                            </div>
                          </div>

                          {index === selectedIndex && (
                            <div className="self-center text-text-secondary text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                              <FontAwesomeIcon icon={faTurnUp} className="rotate-90" />
                            </div>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="py-16 text-center text-text-secondary flex flex-col items-center">
                  {query ? (
                    <>
                      <p className="text-lg font-medium mb-2">No results for "{query}"</p>
                      <p className="text-sm opacity-70">Try checking for typos or using different keywords.</p>
                    </>
                  ) : (
                     <>
                        <p className="text-lg font-medium mb-2">Type to search</p>
                        <p className="text-sm opacity-70">Search guides, API references, and tutorials.</p>
                     </>
                  )}
                </div>
              )}
            </div>
            
            <div className="px-4 py-2 bg-bg-inset border-t border-border-color flex justify-between items-center text-xs text-text-secondary">
               <span>Search by <strong>MiniSearch</strong></span>
               <div className="flex gap-3">
                  <span className="flex items-center gap-1"><kbd className="bg-bg-surface border border-border-color px-1 rounded">↑</kbd> <kbd className="bg-bg-surface border border-border-color px-1 rounded">↓</kbd> Navigate</span>
                  <span className="flex items-center gap-1"><kbd className="bg-bg-surface border border-border-color px-1 rounded">↵</kbd> Select</span>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;