import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

export default function OfficerDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Petugas</h1>
        <p className="text-muted-foreground">Selamat datang! Kelola peminjaman alat Anda di sini.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alat Tersedia</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
             <Button asChild className="mt-2" size="sm">
                <Link href="/petugas/daftar-alat">Lihat & Pinjam</Link>
              </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alat Dipinjam</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
             <p className="text-xs text-muted-foreground">
              Alat dalam peminjaman Anda
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengajuan Disetujui</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Menunggu pengambilan alat
            </p>
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Riwayat Peminjaman</CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground">Belum ada riwayat peminjaman.</p>
        </CardContent>
      </Card>
    </div>
  );
}
