'use client';

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
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

const passwordSchema = z.object({
    currentPassword: z.string().min(1, { message: 'Kata sandi saat ini diperlukan.' }),
    newPassword: z.string().min(6, { message: 'Kata sandi baru minimal 6 karakter.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Konfirmasi kata sandi tidak cocok.',
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onPasswordSubmit = (data: PasswordFormValues) => {
    console.log(data);
    toast({
      title: 'Kata Sandi Diperbarui',
      description: 'Kata sandi Anda telah berhasil diubah.',
    });
    reset();
  };
  
  const onNotificationSave = () => {
     toast({
      title: 'Pengaturan Notifikasi Disimpan',
      description: 'Preferensi notifikasi Anda telah diperbarui.',
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola pengaturan akun dan preferensi Anda.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onPasswordSubmit)}>
          <CardHeader>
            <CardTitle>Ubah Kata Sandi</CardTitle>
            <CardDescription>
              Pastikan untuk menggunakan kata sandi yang kuat untuk menjaga keamanan akun Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Kata Sandi Saat Ini</Label>
              <Input id="currentPassword" type="password" {...register('currentPassword')} />
              {errors.currentPassword && <p className="text-sm text-destructive">{errors.currentPassword.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">Kata Sandi Baru</Label>
              <Input id="newPassword" type="password" {...register('newPassword')} />
              {errors.newPassword && <p className="text-sm text-destructive">{errors.newPassword.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi Baru</Label>
              <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Ubah Kata Sandi</Button>
          </CardFooter>
        </form>
      </Card>
      
      <Card>
          <CardHeader>
            <CardTitle>Notifikasi</CardTitle>
            <CardDescription>
              Pilih jenis notifikasi yang ingin Anda terima.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <h3 className="font-medium">Notifikasi Email</h3>
                    <p className="text-sm text-muted-foreground">
                        Terima email tentang aktivitas akun Anda.
                    </p>
                </div>
                <Switch defaultChecked />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <h3 className="font-medium">Notifikasi Push</h3>
                    <p className="text-sm text-muted-foreground">
                        Dapatkan notifikasi push di perangkat Anda.
                    </p>
                </div>
                <Switch />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={onNotificationSave}>Simpan Preferensi</Button>
          </CardFooter>
      </Card>
    </div>
  );
}
