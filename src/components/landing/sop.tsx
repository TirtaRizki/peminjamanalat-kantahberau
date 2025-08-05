import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function Sop() {
  return (
    <section id="sop" className="py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            SOP Peminjaman Alat
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Ikuti prosedur standar kami untuk peminjaman alat survey yang mudah dan cepat.
          </p>
        </div>
        <div className="mt-12 flex justify-center">
          <Card className="max-w-4xl w-full shadow-2xl overflow-hidden">
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
      </div>
    </section>
  );
}
