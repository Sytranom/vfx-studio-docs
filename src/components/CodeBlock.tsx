import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

interface CodeBlockProps {
  children: React.ReactNode;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window === "undefined" || !children) return;

    const codeString = React.Children.toArray(children).join("");
    navigator.clipboard.writeText(codeString).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="copy-code-btn"
          title="Copy code"
        >
          {isCopied ? (
            <>
              <FontAwesomeIcon icon={faCheck} /> Copied!
            </>
          ) : (
            <FontAwesomeIcon icon={faCopy} />
          )}
        </button>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
