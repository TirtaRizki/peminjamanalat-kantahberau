import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="https://placehold.co/40x40.png" alt="SILAB Berau Logo" width={24} height={24} className="h-6 w-6 rounded-md" data-ai-hint="logo" />
            <span className="font-bold">SILAB Berau</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kantor Pertanahan Kabupaten Berau. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
