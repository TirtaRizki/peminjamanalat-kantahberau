import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="kontak" className="py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Kontak & Lokasi
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Kunjungi kami atau hubungi untuk informasi lebih lanjut.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Alamat Kantor</h3>
                <p className="text-muted-foreground mt-1">
                  Jl. Murjani I, Tj. Redeb, Kabupaten Berau, <br />
                  Kalimantan Timur 77315, Indonesia
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Telepon</h3>
                <p className="text-muted-foreground mt-1">(0554) 123-456</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-muted-foreground mt-1">kontak@bpnberau.go.id</p>
              </div>
            </div>
          </div>
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0">
               <Image
                src="https://placehold.co/600x400.png"
                alt="Map location of BPN Berau office"
                width={600}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint="map location"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
