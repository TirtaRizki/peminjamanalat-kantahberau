import DashboardLayout from '@/components/dashboard/dashboard-layout';

export default function OfficerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: 'Dashboard', href: '/petugas/dashboard' },
    { name: 'Daftar Alat', href: '/petugas/daftar-alat' },
    { name: 'Peminjaman Saya', href: '/petugas/peminjaman' },
  ];
  
  return <DashboardLayout navItems={navItems} isOfficer={true}>{children}</DashboardLayout>;
}
