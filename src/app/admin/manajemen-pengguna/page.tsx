'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const initialUsers = [
  {
    id: 'USR-001',
    name: 'Admin Utama',
    email: 'admin@kantahberau.com',
    role: 'Admin',
    avatar: 'https://placehold.co/40x40.png',
  },
  {
    id: 'USR-002',
    name: 'Petugas Lapangan 1',
    email: 'petugas@kantahberau.com',
    role: 'Petugas',
    avatar: 'https://placehold.co/40x40.png',
  },
  {
    id: 'USR-003',
    name: 'Andi Wijaya',
    email: 'andi.w@kantahberau.com',
    role: 'Petugas',
    avatar: 'https://placehold.co/40x40.png',
  },
  {
    id: 'USR-004',
    name: 'Budi Santoso',
    email: 'budi.s@kantahberau.com',
    role: 'Petugas',
    avatar: 'https://placehold.co/40x40.png',
  },
];

type User = typeof initialUsers[0];

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'Admin':
      return <Badge className="bg-primary/80">{role}</Badge>;
    case 'Petugas':
      return <Badge variant="secondary">{role}</Badge>;
    default:
      return <Badge>{role}</Badge>;
  }
};

export default function ManajemenPenggunaPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);

  const handleAdd = () => {
    setSelectedUser(null);
    setFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUserEmail = formData.get('email') as string;

    // Check for duplicate email
    if (
      users.some(
        (user) =>
          user.email === newUserEmail &&
          (!selectedUser || user.id !== selectedUser.id)
      )
    ) {
      alert('Email sudah terdaftar. Silakan gunakan email lain.');
      return;
    }

    const newUserData = {
      name: formData.get('name') as string,
      email: newUserEmail,
      role: formData.get('role') as string,
    };

    if (selectedUser) {
      // Update
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...newUserData } : user
        )
      );
    } else {
      // Create
      const newUser: User = {
        id: `USR-${String(users.length + 1).padStart(3, '0')}`,
        avatar: 'https://placehold.co/40x40.png',
        ...newUserData,
      };
      setUsers([...users, newUser]);
    }
    setFormOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Pengguna</h1>
          <p className="text-muted-foreground">
            Kelola pengguna sistem, admin, dan petugas.
          </p>
        </div>
        <Button size="sm" onClick={handleAdd}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
            </DialogTitle>
            <DialogDescription>
              Isi detail pengguna di bawah ini. Password default akan dibuatkan sistem.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={selectedUser?.name}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={selectedUser?.email}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select name="role" defaultValue={selectedUser?.role ?? 'Petugas'}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Petugas">Petugas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
          <CardDescription>
            Total {users.length} pengguna terdaftar dalam sistem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage
                          src={user.avatar}
                          alt={user.name}
                          data-ai-hint="avatar"
                        />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuItem onSelect={() => handleEdit(user)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <AlertDialogTrigger asChild>
                             <DropdownMenuItem className="text-destructive" disabled={user.role === 'Admin'}>Hapus</DropdownMenuItem>
                          </AlertDialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Anda yakin?</AlertDialogTitle>
                          <AlertDialogDescription>
                           Tindakan ini tidak dapat diurungkan. Ini akan menghapus pengguna secara permanen.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(user.id)}>
                            Ya, Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Menampilkan <strong>1-{users.length}</strong> dari <strong>{users.length}</strong> pengguna
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
