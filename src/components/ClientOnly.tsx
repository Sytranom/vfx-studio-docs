'use client';

import React, { useState, useEffect } from 'react';

// This component wraps any other component that should only be rendered on the client.
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  // State to track if the component has mounted on the client.
  const [hasMounted, setHasMounted] = useState(false);

  // useEffect runs only on the client, after the initial render.
  useEffect(() => {
    // When the effect runs, we set the state to true.
    setHasMounted(true);
  }, []); // The empty dependency array ensures this runs only once.

  // If the component has not yet mounted (i.e., we're on the server or during the initial client render),
  // we return null so that there is no hydration mismatch.
  if (!hasMounted) {
    return null;
  }

  // Once mounted, we render the children.
  return <>{children}</>;
};

export default ClientOnly;