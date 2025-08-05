import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, ShieldCheck, CheckSquare, Clock } from 'lucide-react';

export default function Sop() {
  const features = [
    {
      icon: Building,
      title: 'Alat Kepemilikan',
      description: 'Pemerintah Setempat',
    },
    {
      icon: ShieldCheck,
      title: 'Kualitas Alat',
      description: 'Terbaik',
    },
    {
      icon: CheckSquare,
      title: 'Mudah',
      description: 'Di akses',
    },
    {
      icon: Clock,
      title: 'Panduan Peminjaman',
      description: '24/7',
    },
  ];

  return (
    <section id="sop" className="py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            SOP Peminjaman Alat
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Simak dan Ikuti Arahan Panduan Peminjaman Alat yang Sudah Tertera Di Gambar Berikut.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <Card className="w-full shadow-2xl overflow-hidden rounded-xl">
              <CardContent className="p-0">
                 <Image
                  src="https://placehold.co/800x1100.png"
                  alt="SOP Peminjaman Alat Survey"
                  width={800}
                  height={1100}
                  className="w-full h-auto"
                  data-ai-hint="flowchart document"
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <feature.icon className="h-6 w-6 text-primary group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
