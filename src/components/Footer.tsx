import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  const router = useRouter();
  const [year, setYear] = useState(new Date().getFullYear());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setYear(new Date().getFullYear());
  }, []);
  
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
  
  const editUrl = fileToEdit ? `${GITHUB_BASE_URL}${fileToEdit}` : null;

  return (
    <footer className="w-full text-sm text-text-secondary pt-8 mt-12 border-t border-border-color">
      <div className="flex justify-between items-center">
        {isMounted ? (
            <span>MIT {year} © Sytranom</span>
        ) : (
            <span>MIT © Sytranom</span>
        )}
        {editUrl && (
          <a
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-text-primary transition-colors"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <span>Edit this page on GitHub</span>
          </a>
        )}
      </div>
    </footer>
  );
};

export default Footer;