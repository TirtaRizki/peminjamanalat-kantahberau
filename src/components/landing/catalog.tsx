'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { initialTools } from '@/lib/data';

export default function Catalog() {
  return (
    <section id="katalog" className="py-20 md:py-28 bg-secondary/70">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Katalog Alat Survey
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Jelajahi berbagai jenis peralatan survey yang kami sediakan.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
          {initialTools.map((tool) => (
            <Card key={tool.id} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint="surveying tool"
                  />
                </div>
              </CardContent>
              <CardHeader className="p-4">
                <CardTitle className="text-base text-center font-semibold">{tool.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}