'use client';

import { useUsers } from './use-users';
import { useEffect, useState } from 'react';

// This is a simple client-side persistence layer using zustand.
// It helps to keep user data consistent across different pages
// without a real database.
// It also handles rehydration to ensure server and client markup match.
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? children : null}</>;
}
