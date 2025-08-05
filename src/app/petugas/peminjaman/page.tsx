'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { useToast } from '@/hooks/use-toast';
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

export default function PeminjamanSayaPage() {
  const { loans, removeLoan, updateLoanStatus } = useLoans();
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  const handleCancelLoan = (loanId: string) => {
    removeLoan(loanId);
    toast({
      title: 'Pengajuan Dibatalkan',
      description: 'Permintaan peminjaman telah berhasil dibatalkan.',
    });
  };
  
  const generateWaLink = (message: string) => {
    const phone = '6283160354907'; // Ganti dengan nomor WA admin
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  const handleTakeTool = (loan: Loan) => {
     const message = `Halo Admin, saya ${loan.borrower} ingin mengonfirmasi pengambilan alat "${loan.tool}" (ID: ${loan.id}). Terima kasih.`;
     window.open(generateWaLink(message), '_blank');
     updateLoanStatus(loan.id, 'Dipinjam');
  };

  const handleReturnTool = (loan: Loan) => {
    const message = `Halo Admin, saya ${loan.borrower} ingin mengonfirmasi pengembalian alat "${loan.tool}" (ID: ${loan.id}). Terima kasih.`;
     window.open(generateWaLink(message), '_blank');
  };

  const filteredLoans = loans.filter((loan) => {
    // Assuming a single user for now: "Petugas Lapangan 1"
    const isMyLoan = loan.borrower === 'Petugas Lapangan 1' || loan.borrower === 'Andi Wijaya' || loan.borrower === 'Budi Santoso' || loan.borrower === 'Citra Lestari' || loan.borrower === 'Doni Firmansyah';
    if (!isMyLoan) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['Disetujui', 'Menunggu Persetujuan', 'Dipinjam'].includes(loan.status);
    if (activeTab === 'history') return loan.status === 'Selesai' || loan.status === 'Ditolak';
    return false;
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Peminjaman Saya</h1>
        <p className="text-muted-foreground">Lacak semua peminjaman alat Anda di sini.</p>
      </div>

       <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="active">Aktif & Menunggu</TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Daftar Peminjaman</CardTitle>
              <CardDescription>
                Total {filteredLoans.length} peminjaman tercatat.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alat</TableHead>
                      <TableHead className="hidden md:table-cell">Tgl. Pinjam</TableHead>
                      <TableHead className="hidden md:table-cell">Tgl. Kembali</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">Keperluan</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoans.length > 0 ? (
                      filteredLoans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.tool}</TableCell>
                          <TableCell className="hidden md:table-cell">{loan.loanDate}</TableCell>
                          <TableCell className="hidden md:table-cell">{loan.returnDate}</TableCell>
                          <TableCell>{getStatusBadge(loan.status)}</TableCell>
                          <TableCell className="hidden sm:table-cell max-w-[200px] truncate">{loan.notes}</TableCell>
                          <TableCell>
                            {loan.status === 'Menunggu Persetujuan' && (
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
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem className="text-destructive">
                                        Batalkan Pengajuan
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Anda yakin?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tindakan ini akan membatalkan permintaan peminjaman Anda. Anda tidak dapat mengurungkan tindakan ini.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleCancelLoan(loan.id)}>
                                      Ya, Batalkan
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                            {loan.status === 'Disetujui' && (
                              <Button size="sm" onClick={() => handleTakeTool(loan)}>
                                Ambil Alat
                              </Button>
                            )}
                             {loan.status === 'Dipinjam' && (
                              <Button size="sm" variant="outline" onClick={() => handleReturnTool(loan)}>
                                Kembalikan Alat
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
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
