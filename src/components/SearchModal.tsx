import React, { useState, useEffect, useCallback } from 'react';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import { createPortal } from 'react-dom';

const ALGOLIA_APP_ID = 'YOUR_APP_ID';
const ALGOLIA_API_KEY = 'YOUR_API_KEY';
const ALGOLIA_INDEX_NAME = 'YOUR_INDEX_NAME';

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useDocSearchKeyboardEvents({ isOpen, onOpen: () => setIsOpen(true), onClose: () => setIsOpen(false) });

  useEffect(() => {
    setIsMounted(true);
    const openModal = () => setIsOpen(true);
    window.addEventListener('open-search-modal', openModal);
    return () => {
      window.removeEventListener('open-search-modal', openModal);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    isOpen && (
      <DocSearchModal
        appId={ALGOLIA_APP_ID}
        apiKey={ALGOLIA_API_KEY}
        indexName={ALGOLIA_INDEX_NAME}
        onClose={() => setIsOpen(false)}
        placeholder="Search documentation..."
      />
    ),
    document.body
  );
};

export default SearchModal;