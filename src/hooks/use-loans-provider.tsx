'use client';

import { useEffect, useState } from 'react';

// This is a simple client-side persistence layer using zustand.
// It helps to keep loan data consistent across different pages
// without a real database.
// It also handles rehydration to ensure server and client markup match.
export function LoanProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? children : null}</>;
}
