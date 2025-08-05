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


// Mock data for officer's loans
const officerLoans = [
  {
    id: 'LOAN-002',
    tool: 'GPS Geodetik',
    loanDate: '2024-07-28',
    returnDate: '2024-08-02',
    status: 'Disetujui',
    notes: 'Survei untuk proyek jalan tol seksi 3.'
  },
  {
    id: 'LOAN-005',
    borrower: 'Budi Santoso',
    tool: 'Drone RTK',
    loanDate: '2024-08-10',
    returnDate: '2024-08-15',
    status: 'Menunggu Persetujuan',
    notes: 'Pemetaan topografi area perkebunan kelapa sawit.'
  },
  {
    id: 'LOAN-006',
    tool: 'Waterpass',
    loanDate: '2024-07-15',
    returnDate: '2024-07-20',
    status: 'Selesai',
    notes: 'Pekerjaan levelling untuk konstruksi gedung.'
  },
];

type Loan = typeof officerLoans[0];

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

export default function PeminjamanSayaPage() {
  const [loans, setLoans] = useState<Loan[]>(officerLoans);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  const handleCancelLoan = (loanId: string) => {
    // In a real app, this would also update the tool's status back to 'Tersedia'
    setLoans(loans.filter(loan => loan.id !== loanId));
    toast({
      title: 'Pengajuan Dibatalkan',
      description: 'Permintaan peminjaman telah berhasil dibatalkan.',
    });
  };

  const filteredLoans = loans.filter((loan) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return loan.status === 'Disetujui' || loan.status === 'Menunggu Persetujuan';
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alat</TableHead>
                    <TableHead>Tgl. Pinjam</TableHead>
                    <TableHead>Tgl. Kembali</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Keperluan</TableHead>
                    <TableHead>
                       <span className="sr-only">Aksi</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLoans.length > 0 ? (
                    filteredLoans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{loan.tool}</TableCell>
                        <TableCell>{loan.loanDate}</TableCell>
                        <TableCell>{loan.returnDate}</TableCell>
                        <TableCell>{getStatusBadge(loan.status)}</TableCell>
                        <TableCell>{loan.notes}</TableCell>
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
