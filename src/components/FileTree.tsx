import React from 'react';
import { Folder as FolderIcon, File as FileIcon } from 'lucide-react';

interface FileTreeProps {
  children: React.ReactNode;
}

export const FileTree: React.FC<FileTreeProps> = ({ children }) => {
  return (
    <div className="file-tree my-6 p-4 bg-bg-surface border border-border-color rounded-lg">
      <ul>{children}</ul>
    </div>
  );
};

export const Folder: React.FC<{ name: string; children?: React.ReactNode }> = ({ name, children }) => {
  return (
    <li className="file-tree-item">
      <div className="flex items-center gap-2">
        <FolderIcon size={16} className="text-sky-400" />
        <span className="font-semibold">{name}</span>
      </div>
      {children && <ul className="pl-6">{children}</ul>}
    </li>
  );
};

export const File: React.FC<{ name: string }> = ({ name }) => {
  return (
    <li className="file-tree-item">
      <div className="flex items-center gap-2">
        <FileIcon size={16} className="text-text-secondary" />
        <span>{name}</span>
      </div>
    </li>
  );
};