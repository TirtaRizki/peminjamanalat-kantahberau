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
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useUsers } from '@/hooks/use-users';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nama minimal 3 karakter.' }),
  email: z.string().email({ message: 'Alamat email tidak valid.' }).refine(email => email.endsWith('@kantahberau.com'), {
    message: 'Hanya email dengan domain @kantahberau.com yang diizinkan.'
  }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter.' }),
});

export default function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { addUser, users } = useUsers();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
     if (users.some(user => user.email === values.email)) {
       toast({
        variant: 'destructive',
        title: 'Pendaftaran Gagal',
        description: 'Email sudah terdaftar. Silakan gunakan email lain.',
      });
      return;
    }

    addUser({
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      name: values.name,
      email: values.email,
      password: values.password, // Save password
      role: 'Petugas',
      avatar: '/images/avatar-placeholder.png',
    });

    toast({
      title: 'Pendaftaran Berhasil',
      description: 'Akun Anda telah dibuat. Silakan login.',
    });
    router.push('/login/officer');
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary/70 p-4 relative overflow-hidden">
       <div className="absolute top-0 left-0 right-0 h-1/2 bg-background -skew-y-6 origin-top-left"></div>
       <div className="relative z-10 w-full max-w-md">
        <Card className="mx-auto max-w-sm shadow-2xl animate-fade-in-up">
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
            <CardTitle className="text-2xl">Daftar Akun Petugas</CardTitle>
            <CardDescription>
              Buat akun baru untuk mulai menggunakan sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Anda" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="nama@kantahberau.com" {...field} />
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
                <Button type="submit" className="w-full">
                  Buat Akun
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Sudah punya akun?{' '}
              <Link href="/login/officer" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
       </div>
    </div>
  );
}
