'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowUp, Instagram, MapPin, Phone } from 'lucide-react';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.85-.38-6.75-1.77-1.02-.75-1.85-1.6-2.5-2.58-.59-.85-1.03-1.8-1.3-2.82-.41-1.48-.64-3.01-.66-4.57.02-1.52.23-3.04.62-4.53.37-1.42.88-2.78 1.58-4.04.71-1.27 1.6-2.41 2.65-3.39.85-.79 1.8-1.47 2.82-2.02.7-.37 1.45-.64 2.2-.82.01 1.52.02 3.04.01 4.57-.45.06-.89.16-1.32.28-.43.12-.85.28-1.25.48-.4.2-.79.43-1.16.69-.37.26-.72.54-1.05.85-.33.3-.64.63-.92.98-.28.35-.55.72-.79 1.11-.24.39-.46.8-.66 1.23-.2.43-.37.87-.52 1.32-.14.45-.27.91-.38 1.39-.11.48-.19.97-.26 1.47-.07.5-.12 1-.15 1.51-.03.49-.05.99-.04 1.49.01.5.04 1 .09 1.49.05.49.12.98.21 1.46.1.48.21.96.35 1.43.14.47.3.93.49 1.38.19.45.41.89.66 1.32.25.43.53.84.84 1.24.31.4.65.78 1.02 1.13.37.35.77.67 1.2.96.43.28.88.53 1.35.74.47.21.96.38 1.46.51.5.12 1.01.2 1.52.24.51.04 1.02.06 1.53.05.51-.01 1.02-.04 1.52-.1.5-.06 1-.15 1.48-.27.48-.12.95-.29 1.41-.48.45-.2.89-.43 1.31-.69.42-.26.82-.55 1.2-.88.38-.33.74-.69 1.07-1.08.33-.39.63-.81.89-1.25.27-.44.5-9.22.5-9.66Z" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer 
      className="relative pt-20 pb-10 border-t bg-cover bg-center"
      style={{ backgroundImage: "url('/images/footer.png')" }}
    >
      <div className="absolute inset-0 bg-secondary/70 z-0"></div>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
           <div className="text-center md:text-left">
             <h3 className="text-xl font-bold mb-4">ALAMAT</h3>
             <div className="space-y-2">
               <p className="flex items-center justify-center md:justify-start gap-2 group">
                 <MapPin className="h-5 w-5 text-primary group-hover:text-black transition-colors" />
                 <span className="font-bold">Jalan Dr. Marjuni No. 1, Tanjung Redep</span>
               </p>
               <p className="flex items-center justify-center md:justify-start gap-2 group">
                 <Phone className="h-5 w-5 text-primary group-hover:text-black transition-colors" />
                 <span className="font-bold">Telepon +6283160354907</span>
               </p>
             </div>
             <div className="flex justify-center md:justify-start gap-2 mt-4">
                <Button variant="ghost" size="icon" asChild className="group text-black hover:bg-black/10">
                 <Link href="https://www.tiktok.com/@kantahkabberau?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
                   <TikTokIcon className="h-5 w-5 group-hover:scale-125 transition-transform" />
                 </Link>
               </Button>
               <Button variant="ghost" size="icon" asChild className="group text-black hover:bg-black/10">
                 <Link href="https://www.instagram.com/kantahkabberau?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
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
          <p className="font-bold">© {new Date().getFullYear()} Hak Cipta Kantor Pertanahan Kab. Berau.</p>
          <p className="font-bold">Fullstack Developer By Tirta Rizki Ramadhan @ 2025 All Right Reserved</p>
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
