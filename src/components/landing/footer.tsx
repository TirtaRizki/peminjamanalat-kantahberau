'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowUp, Facebook, Instagram, Twitter, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-secondary/70 pt-20 pb-10 border-t overflow-hidden">
      <Image
        src="/images/footer.png"
        alt="BPN Berau Team"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-50"
        data-ai-hint="office team"
      />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
           <div className="text-center md:text-left">
             <h3 className="text-xl font-bold mb-4">ALAMAT</h3>
             <div className="space-y-2">
               <p className="flex items-center justify-center md:justify-start gap-2 group">
                 <MapPin className="h-5 w-5 text-primary group-hover:text-black transition-colors" />
                 <span>Jalan Dr. Marjuni No. 1, Tanjung Redep</span>
               </p>
               <p className="flex items-center justify-center md:justify-start gap-2 group">
                 <Phone className="h-5 w-5 text-primary group-hover:text-black transition-colors" />
                 <span>Telepon +6283160354907</span>
               </p>
             </div>
             <div className="flex justify-center md:justify-start gap-2 mt-4">
               <Button variant="ghost" size="icon" asChild className="group text-black hover:bg-black/10">
                 <Link href="#">
                   <Facebook className="h-5 w-5 group-hover:scale-125 transition-transform" />
                 </Link>
               </Button>
               <Button variant="ghost" size="icon" asChild className="group text-black hover:bg-black/10">
                 <Link href="#">
                   <Twitter className="h-5 w-5 group-hover:scale-125 transition-transform" />
                 </Link>
               </Button>
               <Button variant="ghost" size="icon" asChild className="group text-black hover:bg-black/10">
                 <Link href="#">
                   <Instagram className="h-5 w-5 group-hover:scale-125 transition-transform" />
                 </Link>
               </Button>
             </div>
           </div>
           <div className="flex justify-center items-start md:justify-end">
             <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="SILAB Berau Logo" width={32} height={32} className="h-8 w-8 rounded-md" data-ai-hint="logo" />
              <span className="font-bold text-lg">SILAB Berau</span>
            </Link>
           </div>
        </div>
        <div className="border-t border-black/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm gap-4 text-center">
          <p>© {new Date().getFullYear()} Hak Cipta Kantor Pertanahan Kab. Berau.</p>
          <p>Fullstack Developer By Tirta Rizki Ramadhan @ 2025 All Right Reserved</p>
        </div>
      </div>
      <Button
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 rounded-full h-12 w-12 z-20 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
      </Button>
    </footer>
  );
}
