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
            <div className="flex items-start gap-4 group">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-primary group-hover:animate-ping" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Alamat Kantor</h3>
                <p className="text-muted-foreground mt-1">
                  Jl. Murjani I, Tj. Redeb, Kabupaten Berau, <br />
                  Kalimantan Timur 77315, Indonesia
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-primary group-hover:animate-shake" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Telepon</h3>
                <p className="text-muted-foreground mt-1">+6283160354907</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-primary group-hover:animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-muted-foreground mt-1">kontak@bpnberau.go.id</p>
              </div>
            </div>
          </div>
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0 h-full">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.017611164208!2d117.500487575985!3d2.1469428584933556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x320df4fff085da65%3A0x93dbf250f6104bc8!2sBPN!5e0!3m2!1sid!2sid!4v1754402113907!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
