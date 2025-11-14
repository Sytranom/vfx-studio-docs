import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationLinkProps {
  type: 'prev' | 'next';
  href: string;
  title: string;
}

const PaginationLink: React.FC<PaginationLinkProps> = ({ type, href, title }) => {
  const isPrev = type === 'prev';
  
  return (
    <Link 
      href={href} 
      className="block p-4 border border-border-color rounded-lg hover:border-primary-accent transition-colors"
    >
      <div className={`text-sm text-text-secondary ${isPrev ? 'text-left' : 'text-right'}`}>
        {isPrev ? 'Previous' : 'Next'}
      </div>
      <div className={`flex items-center gap-2 mt-1 font-semibold text-primary-accent ${isPrev ? 'justify-start' : 'justify-end'}`}>
        {isPrev && <FontAwesomeIcon icon={faArrowLeft} />}
        <span>{title}</span>
        {!isPrev && <FontAwesomeIcon icon={faArrowRight} />}
      </div>
    </Link>
  );
};

export default PaginationLink;