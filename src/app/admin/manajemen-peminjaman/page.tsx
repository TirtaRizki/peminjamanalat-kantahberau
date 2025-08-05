
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
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loans = [
  {
    id: "LOAN-001",
    borrower: "Andi Wijaya",
    tool: "Total Station",
    loanDate: "2024-08-01",
    returnDate: "2024-08-05",
    status: "Menunggu Persetujuan",
  },
  {
    id: "LOAN-002",
    borrower: "Budi Santoso",
    tool: "GPS Geodetik",
    loanDate: "2024-07-28",
    returnDate: "2024-08-02",
    status: "Disetujui",
  },
  {
    id: "LOAN-003",
    borrower: "Citra Lestari",
    tool: "Waterpass",
    loanDate: "2024-07-25",
    returnDate: "2024-07-30",
    status: "Selesai",
  },
   {
    id: "LOAN-004",
    borrower: "Doni Firmansyah",
    tool: "Theodolite",
    loanDate: "2024-07-20",
    returnDate: "2024-07-22",
    status: "Ditolak",
  },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Menunggu Persetujuan':
            return <Badge variant="secondary" className="text-yellow-500">{status}</Badge>;
        case 'Disetujui':
            return <Badge className="bg-green-500">{status}</Badge>;
        case 'Ditolak':
            return <Badge variant="destructive">{status}</Badge>;
        case 'Selesai':
            return <Badge variant="outline" className="text-blue-500 border-blue-500">{status}</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};


export default function ManajemenPeminjamanPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Peminjaman</h1>
        <p className="text-muted-foreground">Kelola semua permintaan peminjaman alat.</p>
      </div>

       <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="pending">Menunggu Persetujuan</TabsTrigger>
              <TabsTrigger value="approved">Disetujui</TabsTrigger>
              <TabsTrigger value="completed">Selesai</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Peminjaman</CardTitle>
                <CardDescription>
                  Total {loans.length} peminjaman terdaftar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Peminjam</TableHead>
                      <TableHead>Alat</TableHead>
                      <TableHead>Tgl. Pinjam</TableHead>
                      <TableHead>Tgl. Kembali</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{loan.borrower}</TableCell>
                        <TableCell>{loan.tool}</TableCell>
                        <TableCell>{loan.loanDate}</TableCell>
                        <TableCell>{loan.returnDate}</TableCell>
                        <TableCell>{getStatusBadge(loan.status)}</TableCell>
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
                              <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                              <DropdownMenuItem>Setujui</DropdownMenuItem>
                              <DropdownMenuItem>Tolak</DropdownMenuItem>
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
                  Menampilkan <strong>1-4</strong> dari <strong>{loans.length}</strong> peminjaman
                </div>
              </CardFooter>
            </Card>
           </TabsContent>
         </Tabs>
    </div>
  );
}
