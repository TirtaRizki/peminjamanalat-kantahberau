'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Beranda', href: '#home' },
  { name: 'Tentang', href: '#tentang' },
  { name: 'SOP', href: '#sop' },
  { name: 'Katalog', href: '#katalog' },
  { name: 'Kontak', href: '#kontak' },
];

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-300",
      hasScrolled ? "border-border bg-background/80 backdrop-blur-lg shadow-sm" : "border-transparent bg-background"
    )}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="https://placehold.co/40x40.png" alt="SILAB Berau Logo" width={32} height={32} className="h-8 w-8 rounded-md" data-ai-hint="logo" />
          <span className="font-bold text-lg">SILAB Berau</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Login</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/login/admin" className="w-full">Admin</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/login/officer" className="w-full">Petugas</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] bg-gradient-to-br from-background via-secondary/50 to-background p-0">
              <div className="flex flex-col gap-4 p-6 h-full">
                 <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setMobileMenuOpen(false)}>
                  <Image src="https://placehold.co/40x40.png" alt="SILAB Berau Logo" width={32} height={32} className="h-8 w-8 rounded-md" data-ai-hint="logo" />
                  <span className="font-bold text-lg text-foreground">SILAB Berau</span>
                </Link>
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium p-3 rounded-md transition-all duration-300 hover:bg-primary/10 hover:pl-5 animate-fade-in-up"
                      style={{ animationDelay: `${index * 100 + 200}ms`}}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}