import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface BreadcrumbsProps {
  path: string;
}

const pathMap: { [key: string]: string } = {
  'Home': '/',
  'Tutorials': '/tutorials',
  'How-To Guides': '/guides',
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
  const parts = path.split(' / ');

  return (
    <nav className="flex items-center gap-2 text-text-secondary font-medium text-sm">
      {parts.map((part, index) => {
        const isLast = index === parts.length - 1;
        const href = pathMap[part.trim()];

        return (
          <React.Fragment key={index}>
            {href && !isLast ? (
              <Link href={href} className="hover:text-text-primary transition-colors">
                {part}
              </Link>
            ) : (
              <span className={isLast ? 'text-text-primary' : ''}>{part}</span>
            )}
            {!isLast && <FontAwesomeIcon icon={faChevronRight} className="text-xs" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;