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
import { MoreHorizontal, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLoans, Loan } from '@/hooks/use-loans';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Menunggu Persetujuan':
      return <Badge variant="secondary" className="text-yellow-500">{status}</Badge>;
    case 'Disetujui':
      return <Badge className="bg-green-500">{status}</Badge>;
    case 'Dipinjam':
      return <Badge className="bg-blue-500">{status}</Badge>;
    case 'Ditolak':
      return <Badge variant="destructive">{status}</Badge>;
    case 'Selesai':
      return <Badge variant="outline" className="text-blue-500 border-blue-500">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function ManajemenPeminjamanPage() {
  const { loans, updateLoanStatus } = useLoans();
  const [activeTab, setActiveTab] = useState('all');

  const handleUpdateStatus = (id: string, status: Loan['status']) => {
    updateLoanStatus(id, status);
  };

  const filteredLoans = loans.filter((loan) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return loan.status === 'Menunggu Persetujuan';
    if (activeTab === 'approved') return loan.status === 'Disetujui' || loan.status === 'Dipinjam';
    if (activeTab === 'completed') return loan.status === 'Selesai' || loan.status === 'Ditolak';
    return false;
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Peminjaman</h1>
        <p className="text-muted-foreground">Kelola semua permintaan peminjaman alat.</p>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="pending">Menunggu</TabsTrigger>
            <TabsTrigger value="approved">Aktif</TabsTrigger>
            <TabsTrigger value="completed">Riwayat</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Daftar Peminjaman</CardTitle>
              <CardDescription>
                Total {filteredLoans.length} peminjaman terdaftar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Peminjam</TableHead>
                      <TableHead>Alat</TableHead>
                      <TableHead className="hidden sm:table-cell">Surat</TableHead>
                      <TableHead className="hidden md:table-cell">Tgl. Pinjam</TableHead>
                      <TableHead className="hidden md:table-cell">Tgl. Kembali</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                     {filteredLoans.length > 0 ? (
                      filteredLoans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{loan.borrower}</TableCell>
                        <TableCell>{loan.tool}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {loan.letter ? (
                             <div className="flex items-center gap-2">
                               <FileText className="h-4 w-4 text-muted-foreground" />
                               <span className="text-sm truncate max-w-[120px]">{loan.letter}</span>
                             </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{loan.loanDate}</TableCell>
                        <TableCell className="hidden md:table-cell">{loan.returnDate}</TableCell>
                        <TableCell>{getStatusBadge(loan.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ubah Status</DropdownMenuLabel>
                              <DropdownMenuItem
                                onSelect={() => handleUpdateStatus(loan.id, 'Disetujui')}
                                disabled={loan.status !== 'Menunggu Persetujuan'}
                              >
                                Setujui
                              </DropdownMenuItem>
                               <DropdownMenuItem
                                onSelect={() => handleUpdateStatus(loan.id, 'Dipinjam')}
                                disabled={loan.status !== 'Disetujui'}
                              >
                                Konfirmasi Diambil
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() => handleUpdateStatus(loan.id, 'Ditolak')}
                                 disabled={!['Menunggu Persetujuan', 'Disetujui'].includes(loan.status)}
                              >
                                Tolak
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() => handleUpdateStatus(loan.id, 'Selesai')}
                                 disabled={!['Dipinjam', 'Disetujui'].includes(loan.status)}
                              >
                                Selesaikan
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Tidak ada data peminjaman.
                        </TableCell>
                      </TableRow>
                  )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Menampilkan <strong>{filteredLoans.length}</strong> dari <strong>{loans.length}</strong> peminjaman
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
