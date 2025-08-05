
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  {
    id: "USR-001",
    name: "Admin Utama",
    email: "admin@kantahberau.com",
    role: "Admin",
    avatar: "https://placehold.co/40x40.png",
  },
  {
    id: "USR-002",
    name: "Petugas Lapangan 1",
    email: "petugas@kantahberau.com",
    role: "Petugas",
    avatar: "https://placehold.co/40x40.png",
  },
  {
    id: "USR-003",
    name: "Andi Wijaya",
    email: "andi.w@kantahberau.com",
    role: "Petugas",
    avatar: "https://placehold.co/40x40.png",
  },
  {
    id: "USR-004",
    name: "Budi Santoso",
    email: "budi.s@kantahberau.com",
    role: "Petugas",
    avatar: "https://placehold.co/40x40.png",
  },
];

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
  return (
    <div className="flex flex-col gap-8">
       <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Pengguna</h1>
          <p className="text-muted-foreground">Kelola pengguna sistem, admin, dan petugas.</p>
        </div>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

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
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="avatar" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Hapus</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
         <CardFooter>
          <div className="text-xs text-muted-foreground">
            Menampilkan <strong>1-4</strong> dari <strong>{users.length}</strong> pengguna
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
