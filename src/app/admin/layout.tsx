import DashboardLayout from '@/components/dashboard/dashboard-layout';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard' },
    { name: 'Manajemen Alat', href: '/admin/manajemen-alat' },
    { name: 'Manajemen Peminjaman', href: '/admin/manajemen-peminjaman' },
    { name: 'Manajemen Pengguna', href: '/admin/manajemen-pengguna' },
  ];

  return <DashboardLayout navItems={navItems}>{children}</DashboardLayout>;
}
