'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageSearch, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { initialTools } from '@/lib/data';

export default function Stats() {
  const availableTools = initialTools.filter(tool => tool.status === 'Tersedia').length;
  const goodConditionTools = initialTools.filter(tool => tool.condition === 'Baik').length;

  return (
    <section className="py-20 md:py-24 bg-secondary/70">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20 group">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <PackageSearch className="h-10 w-10 text-primary group-hover:animate-bounce" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-primary">{initialTools.length}</p>
              <p className="mt-2 text-xl font-semibold text-foreground">Alat Survey</p>
              <p className="mt-1 text-muted-foreground">Tersedia untuk dipinjam.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20 group">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <ShieldCheck className="h-10 w-10 text-primary group-hover:animate-pulse" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-primary">{goodConditionTools}</p>
              <p className="mt-2 text-xl font-semibold text-foreground">Kondisi Alat Baik</p>
              <p className="mt-1 text-muted-foreground">Siap untuk digunakan di lapangan.</p>
              <Button asChild className="mt-4" variant="outline">
                <Link href="/katalog">Lihat Detail Alat</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}