import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <section id="tentang" className="py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative w-full h-80 md:h-full order-last md:order-first">
             <Image
              src="https://placehold.co/500x500.png"
              alt="BPN Berau office team"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg"
              data-ai-hint="office team"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Tentang <span className="text-primary">SILAB</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              SILAB merupakan Sistem Informasi Laboratorium Seksi Survei dan Pemetaan Kantor Pertanahan Kabupaten Berau.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Sistem informasi berupa web yang dapat digunakan oleh Petugas Ukur dalam melakukan peminjaman dan perawatan alat-alat pengukuran secara efisien dan transparan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
