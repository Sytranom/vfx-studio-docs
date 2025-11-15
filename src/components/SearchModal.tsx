import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import FlexSearch from "flexsearch";

interface SearchDoc {
  id: number;
  slug: string;
  title: string;
  breadcrumbs: string;
  content: string; 
}

const SearchModal: React.FC = () => {
  const [index, setIndex] = useState<FlexSearch.Document<SearchDoc, true> | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDoc[]>([]);

  const closeModal = () => {
    document.getElementById("search-modal-overlay")?.classList.remove("visible");
    setQuery(""); 
  };

  const openModal = () => {
    document.getElementById("search-modal-overlay")?.classList.add("visible");
    (document.getElementById("search-input") as HTMLInputElement)?.focus();
  };
  
  useEffect(() => {
    const searchIndex = new FlexSearch.Document<SearchDoc, true>({
        document: {
            id: "id",

index: ["title", "breadcrumbs", "content"],
            store: true,
        },
        tokenize: "full" 
    });

    fetch("/search.json")
      .then((response) => response.json())
      .then((docs: Omit<SearchDoc, 'id'>[]) => {
        docs.forEach((doc, i) => {
            searchIndex.add({ ...doc, id: i });
        });
        setIndex(searchIndex);
      });
  }, []);

  useEffect(() => {
    if (!query || !index) {
      setResults([]);
      return;
    }
    const searchResults = index.search<true>(query, 15, { enrich: true });
    
    const flatResults: SearchDoc[] = [];
    const seenIds = new Set();
    
    searchResults.forEach(fieldResult => {
        fieldResult.result.forEach(doc => {
            if (!seenIds.has(doc.doc.id)) {
                flatResults.push(doc.doc);
                seenIds.add(doc.doc.id);
            }
        });
    });

    setResults(flatResults);
  }, [query, index]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        openModal();
      }
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-bg-main/70 backdrop-blur-sm z-50 flex justify-center pt-20 transition-opacity duration-200 search-modal-overlay"
      id="search-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="w-full max-w-2xl h-fit bg-bg-surface rounded-lg border border-border-color shadow-2xl overflow-hidden transform-gpu">
        <div className="flex items-center p-4 border-b border-border-color">
          <FontAwesomeIcon icon={faSearch} className="text-text-secondary mr-4" />
          <input
            type="text"
            placeholder="Search documentation..."
            id="search-input"
            className="w-full bg-transparent border-none outline-none text-text-primary text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="ml-4 bg-bg-inset border-border-color text-text-secondary rounded-md px-3 py-1 text-xs font-mono"
            onClick={closeModal}
          >
            ESC
          </button>
        </div>
        <div className="max-h-[400px] overflow-y-auto" id="search-results">
          {results.length > 0 ? (
            <ul>
                {results.map(result => (
                    <li key={result.id}>
                        <Link href={result.slug} onClick={closeModal} className="block p-4 hover:bg-bg-inset border-b border-border-color">
                            <div className="font-medium text-text-primary">{result.title}</div>
                            {}
                            {}
                        </Link>
                    </li>
                ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-text-secondary">
              <p>{query ? "No results found." : "Type to search..."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;