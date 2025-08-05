'use client';

import { useUsers } from './use-users';
import { useEffect } from 'react';

// This is a simple client-side persistence layer using zustand.
// It helps to keep user data consistent across different pages
// without a real database.

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { users } = useUsers();
  
  // For demonstration, we could add persistence to localStorage here
  // For now, it just ensures the state is managed globally.
  useEffect(() => {
    // You could load users from localStorage here if needed.
  }, []);

  return <>{children}</>;
}
