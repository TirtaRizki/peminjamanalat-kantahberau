import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from '@/hooks/use-users-provider';
import { LoanProvider } from '@/hooks/use-loans-provider';

export const metadata: Metadata = {
  title: 'SILAB Berau - Sistem Informasi Laboratorium',
  description: 'Sistem Informasi Laboratorium Seksi Survei dan Pemetaan Kantor Pertanahan Kabupaten Berau.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <UserProvider>
          <LoanProvider>
            {children}
            <Toaster />
          </LoanProvider>
        </UserProvider>
      </body>
    </html>
  );
}
