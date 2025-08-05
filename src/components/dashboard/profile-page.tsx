'use client';

import { useState } from 'react';
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
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(3, { message: 'Nama harus memiliki minimal 3 karakter.' }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfilePageProps {
  role: 'Admin' | 'Petugas';
}

export default function ProfilePage({ role }: ProfilePageProps) {
  const [user, setUser] = useState({
    name: role === 'Admin' ? 'Admin Utama' : 'Petugas Lapangan 1',
    email: role === 'Admin' ? 'admin@kantahberau.com' : 'petugas@kantahberau.com',
    avatar: '/images/avatar-128x128.png',
  });

  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    setUser((prev) => ({ ...prev, name: data.name }));
    toast({
      title: 'Profil Diperbarui',
      description: 'Nama Anda telah berhasil diubah.',
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profil Pengguna</h1>
        <p className="text-muted-foreground">Kelola informasi profil Anda di sini.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Informasi Profil</CardTitle>
            <CardDescription>
              Perbarui foto dan detail pribadi Anda di sini.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Ubah Foto
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} disabled />
              <p className="text-sm text-muted-foreground">
                Email tidak dapat diubah.
              </p>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Simpan Perubahan</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
