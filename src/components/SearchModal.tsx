import React, { useEffect } from "react";

const SearchModal: React.FC = () => {
  const closeModal = () => {
    document
      .getElementById("search-modal-overlay")
      ?.classList.remove("visible");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document
          .getElementById("search-modal-overlay")
          ?.classList.add("visible");
        (document.getElementById("search-input") as HTMLInputElement)?.focus();
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
      className="search-modal-overlay"
      id="search-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="search-modal">
        <div className="search-input-wrapper">
          <i className="fa-solid fa-search"></i>
          <input
            type="text"
            placeholder="Search documentation..."
            id="search-input"
          />
          <button
            className="close-search-btn"
            id="close-search-btn"
            onClick={closeModal}
          >
            ESC
          </button>
        </div>
        <div className="search-results" id="search-results">
          {/* Search results can be dynamically populated here */}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
