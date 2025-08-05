import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary/70 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-background -skew-y-6 origin-top-left"></div>
      <div className="relative z-10 w-full max-w-md">
        <Card className="shadow-2xl animate-fade-in-up">
          <CardHeader className="text-center">
             <div className="mx-auto mb-4">
               <Image
                src="/images/logo.png"
                alt="SILAB Berau Logo"
                width={80}
                height={80}
                className="rounded-full shadow-lg"
                data-ai-hint="logo"
              />
            </div>
            <CardTitle className="text-2xl">Lupa Password?</CardTitle>
            <CardDescription>
              Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@contoh.com"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Kirim Tautan Reset
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login/officer">Kembali ke Login</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
