'use client';

import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Petugas';
  avatar: string;
};

const initialUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Admin Utama',
    email: 'admin@kantahberau.com',
    role: 'Admin',
    avatar: '/images/avatar-placeholder.png',
  },
  {
    id: 'USR-002',
    name: 'Petugas Lapangan 1',
    email: 'petugas@kantahberau.com',
    role: 'Petugas',
    avatar: '/images/avatar-placeholder.png',
  },
];

type UserState = {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
};

export const useUsers = create<UserState>((set) => ({
  users: initialUsers,
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
}));
