'use client';

import Image from 'next/image';
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
  DialogTrigger,
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const initialTools = [
  {
    id: 'ALT-001',
    name: 'Total Station',
    image: 'https://placehold.co/64x64.png',
    type: 'Elektronik',
    status: 'Tersedia',
    condition: 'Baik',
  },
  {
    id: 'ALT-002',
    name: 'GPS Geodetik',
    image: 'https://placehold.co/64x64.png',
    type: 'Elektronik',
    status: 'Dipinjam',
    condition: 'Baik',
  },
  {
    id: 'ALT-003',
    name: 'Waterpass',
    image: 'https://placehold.co/64x64.png',
    type: 'Optik',
    status: 'Tersedia',
    condition: 'Perbaikan',
  },
  {
    id: 'ALT-004',
    name: 'Theodolite',
    image: 'https://placehold.co/64x64.png',
    type: 'Elektronik',
    status: 'Tersedia',
    condition: 'Baik',
  },
];

type Tool = typeof initialTools[0];

export default function ManajemenAlatPage() {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);

  const handleAdd = () => {
    setSelectedTool(null);
    setFormOpen(true);
  };

  const handleEdit = (tool: Tool) => {
    setSelectedTool(tool);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setTools(tools.filter((tool) => tool.id !== id));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newToolData = {
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      status: formData.get('status') as string,
      condition: formData.get('condition') as string,
    };

    if (selectedTool) {
      // Update
      setTools(
        tools.map((tool) =>
          tool.id === selectedTool.id ? { ...tool, ...newToolData } : tool
        )
      );
    } else {
      // Create
      const newTool: Tool = {
        id: `ALT-${String(tools.length + 1).padStart(3, '0')}`,
        image: 'https://placehold.co/64x64.png',
        ...newToolData,
      };
      setTools([...tools, newTool]);
    }
    setFormOpen(false);
    setSelectedTool(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Alat</h1>
          <p className="text-muted-foreground">
            Kelola semua peralatan survei Anda di sini.
          </p>
        </div>
        <Button size="sm" onClick={handleAdd}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Alat
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedTool ? 'Edit Alat' : 'Tambah Alat Baru'}
            </DialogTitle>
            <DialogDescription>
              Isi detail alat di bawah ini. Klik simpan jika sudah selesai.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Alat
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={selectedTool?.name}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Jenis
              </Label>
              <Input
                id="type"
                name="type"
                defaultValue={selectedTool?.type}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select name="status" defaultValue={selectedTool?.status}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tersedia">Tersedia</SelectItem>
                  <SelectItem value="Dipinjam">Dipinjam</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="condition" className="text-right">
                Kondisi
              </Label>
              <Select name="condition" defaultValue={selectedTool?.condition}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih kondisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baik">Baik</SelectItem>
                  <SelectItem value="Perbaikan">Perbaikan</SelectItem>
                  <SelectItem value="Rusak">Rusak</SelectItem>
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
          <CardTitle>Daftar Alat</CardTitle>
          <CardDescription>
            Total {tools.length} alat terdaftar dalam sistem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Nama Alat</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Kondisi</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={tool.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={tool.image}
                      width="64"
                      data-ai-hint="surveying tool"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{tool.name}</TableCell>
                  <TableCell>{tool.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tool.status === 'Tersedia' ? 'outline' : 'secondary'
                      }
                      className={
                        tool.status === 'Tersedia'
                          ? 'border-green-500 text-green-500'
                          : 'text-red-500'
                      }
                    >
                      {tool.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tool.condition === 'Baik' ? 'default' : 'destructive'
                      }
                      className={tool.condition === 'Baik' ? 'bg-blue-500' : ''}
                    >
                      {tool.condition}
                    </Badge>
                  </TableCell>
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
                          <DropdownMenuItem onSelect={() => handleEdit(tool)}>
                            Edit
                          </DropdownMenuItem>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-destructive">
                              Hapus
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Anda yakin?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tindakan ini tidak dapat diurungkan. Ini akan menghapus alat secara permanen dari server.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(tool.id)}>
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
            Menampilkan <strong>1-{tools.length}</strong> dari <strong>{tools.length}</strong> alat
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
