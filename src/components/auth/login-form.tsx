'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter.' }),
});

type LoginFormProps = {
  title: string;
  role: 'admin' | 'officer';
};

export default function LoginForm({ title, role }: LoginFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    if (role === 'admin') {
      if (email === 'admin@kantahberau.com' && password === 'berauera2025') {
        router.push('/admin/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Gagal',
          description: 'Email atau password untuk admin salah.',
        });
      }
    } else if (role === 'officer') {
      if (email === 'petugas@kantahberau.com' && password === 'petugasgiat2025') {
        router.push('/petugas/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Gagal',
          description: 'Email atau password untuk petugas salah.',
        });
      }
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary/70 p-4 relative">
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-background -skew-y-6"></div>
      <div className="relative z-10 w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Image
                src="https://placehold.co/80x80.png"
                alt="SILAB Berau Logo"
                width={80}
                height={80}
                className="rounded-full"
                data-ai-hint="logo"
              />
            </div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription>
              Masuk untuk mengakses dasbor {role === 'admin' ? 'Admin' : 'Petugas'}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@contoh.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" size="lg">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col">
            <Button variant="link" asChild className="text-muted-foreground group">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Beranda
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
