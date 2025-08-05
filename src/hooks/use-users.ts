'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Petugas';
  avatar: string;
  password?: string; // Made optional for initial admin
};

const initialUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Admin Utama',
    email: 'admin@kantahberau.com',
    role: 'Admin',
    avatar: '/images/avatar-placeholder.png',
    password: 'berauera2025',
  },
  {
    id: 'USR-002',
    name: 'Petugas Lapangan 1',
    email: 'petugas@kantahberau.com',
    role: 'Petugas',
    avatar: '/images/avatar-placeholder.png',
    password: 'password123',
  },
];

type UserState = {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
};

// This implementation uses zustand with persist middleware to save user data
// to localStorage. This makes the data available across browser sessions
// for demonstration purposes, simulating a database.
export const useUsers = create<UserState>()(
  persist(
    (set) => ({
      users: initialUsers,
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
