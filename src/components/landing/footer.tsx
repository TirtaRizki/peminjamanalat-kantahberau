'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Hero() {
  return (
    <section id="home" className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
             SELAMAT DATANG DI SISTEM INFORMASI LABORATURIUM SP BERAU
          </h1>
           <p className="text-lg md:text-xl text-muted-foreground mt-2">
             KANTOR PERTANAHAN KABUPATEN BERAU
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight">
              SILAB Berau
            </h2>
            <p className="mt-4 text-xl md:text-2xl text-foreground font-medium">
              Sistem Informasi Laboratorium
            </p>
            <p className="mt-2 max-w-2xl mx-auto md:mx-0 text-lg text-muted-foreground">
              Kantor Pertanahan Kabupaten Berau
            </p>
            <div className="mt-8 flex gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="group">
                <Link href="/katalog">
                  Lihat Katalog Alat
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/kontak">Hubungi Kami</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full">
             <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0 flex items-center justify-center aspect-video relative">
                <Image
                  src="/images/surveying-land.png"
                  alt="Surveying team at work"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="surveying land"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
