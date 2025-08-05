
import Image from "next/image";
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

const tools = [
  {
    id: "ALT-001",
    name: "Total Station",
    image: "https://placehold.co/64x64.png",
    type: "Elektronik",
    status: "Tersedia",
    condition: "Baik",
  },
  {
    id: "ALT-002",
    name: "GPS Geodetik",
    image: "https://placehold.co/64x64.png",
    type: "Elektronik",
    status: "Dipinjam",
    condition: "Baik",
  },
  {
    id: "ALT-003",
    name: "Waterpass",
    image: "https://placehold.co/64x64.png",
    type: "Optik",
    status: "Tersedia",
    condition: "Perbaikan",
  },
    {
    id: "ALT-004",
    name: "Theodolite",
    image: "https://placehold.co/64x64.png",
    type: "Elektronik",
    status: "Tersedia",
    condition: "Baik",
  },
];


export default function ManajemenAlatPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Alat</h1>
          <p className="text-muted-foreground">Kelola semua peralatan survei Anda di sini.</p>
        </div>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Alat
        </Button>
      </div>

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
                    <Badge variant={tool.status === 'Tersedia' ? 'outline' : 'secondary'} className={
                        tool.status === 'Tersedia' ? 'border-green-500 text-green-500' : 'text-red-500'
                    }>
                      {tool.status}
                    </Badge>
                  </TableCell>
                   <TableCell>
                     <Badge variant={tool.condition === 'Baik' ? 'default' : 'destructive'} className={
                        tool.condition === 'Baik' ? 'bg-blue-500' : ''
                     }>
                       {tool.condition}
                      </Badge>
                  </TableCell>
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
                        <DropdownMenuItem>Hapus</DropdownMenuItem>
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
            Menampilkan <strong>1-4</strong> dari <strong>14</strong> alat
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
