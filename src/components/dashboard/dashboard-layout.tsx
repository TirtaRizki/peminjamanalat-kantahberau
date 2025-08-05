'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Home,
  LogOut,
  Menu,
  Package,
  Users,
  ArrowRightLeft
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon?: React.ElementType;
};

type DashboardLayoutProps = {
  children: React.ReactNode;
  navItems: NavItem[];
  isOfficer?: boolean;
};

const iconMap: { [key: string]: React.ElementType } = {
  Dashboard: Home,
  'Manajemen Alat': Package,
  'Daftar Alat': Package,
  'Manajemen Peminjaman': ArrowRightLeft,
  'Peminjaman Saya': ArrowRightLeft,
  'Manajemen Pengguna': Users,
};

export default function DashboardLayout({ children, navItems, isOfficer = false }: DashboardLayoutProps) {
  const pathname = usePathname();

  const getIcon = (name: string) => {
    return iconMap[name] || Home;
  };

  const profileLink = isOfficer ? '/petugas/profil' : '/admin/profil';
  const settingsLink = isOfficer ? '/petugas/pengaturan' : '/admin/pengaturan';

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-secondary/70">
      <div className="hidden border-r bg-background md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src="/images/logo.png" alt="SILAB Berau Logo" width={24} height={24} className="h-6 w-6 rounded-md" data-ai-hint="logo" />
              <span className="">SILAB Berau</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => {
                const Icon = getIcon(item.name);
                return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    pathname === item.href && 'bg-muted text-primary'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )})}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Butuh Bantuan?</CardTitle>
                <CardDescription>
                  Hubungi admin jika Anda mengalami masalah teknis.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full" asChild>
                  <Link href="https://wa.me/6283160354907" target="_blank">Hubungi Admin</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="flex h-full flex-col bg-background">
                <div className="flex h-14 items-center border-b px-6">
                  <Link href="/" className="flex items-center gap-2 font-semibold">
                     <Image src="/images/logo.png" alt="SILAB Berau Logo" width={24} height={24} className="h-6 w-6 rounded-md" data-ai-hint="logo" />
                    <span className="">SILAB Berau</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <nav className="grid items-start p-4 text-base font-medium">
                    {navItems.map((item, index) => {
                      const Icon = getIcon(item.name);
                      return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-muted',
                           pathname === item.href && 'bg-muted text-primary font-bold'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    )})}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can add a search bar here later */}
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {isOfficer ? 'P' : 'A'}
                </div>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{isOfficer ? 'Petugas' : 'Admin'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={profileLink}>Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={settingsLink}>Pengaturan</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                 <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
