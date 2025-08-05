'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { initialTools } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Tool = typeof initialTools[0];

export default function DaftarAlatPage() {
  const [tools, setTools] = useState(initialTools);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isLoanFormOpen, setLoanFormOpen] = useState(false);
  const [loanDate, setLoanDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleRequestLoan = (tool: Tool) => {
    if (tool.status !== 'Tersedia') {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: 'Alat ini sedang tidak tersedia untuk dipinjam.',
      });
      return;
    }
    setSelectedTool(tool);
    setLoanFormOpen(true);
  };

  const handleLoanSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would submit the loan request to the backend.
    toast({
      title: 'Permintaan Terkirim',
      description: `Permintaan peminjaman untuk ${selectedTool?.name} telah berhasil dikirim.`,
    });
    setLoanFormOpen(false);
    setSelectedTool(null);
  };

  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Daftar Alat</h1>
        <p className="text-muted-foreground">Lihat dan ajukan peminjaman alat yang tersedia.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Card key={tool.id} className="flex flex-col">
            <CardHeader>
              <div className="relative aspect-square w-full mb-4">
                 <Image
                  src={tool.image}
                  alt={tool.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                  data-ai-hint="surveying tool"
                />
              </div>
              <CardTitle>{tool.name}</CardTitle>
              <CardDescription>{tool.type}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <div>
                <span className="font-semibold">Status: </span>
                 <Badge
                    variant={tool.status === 'Tersedia' ? 'outline' : 'secondary'}
                    className={tool.status === 'Tersedia' ? 'border-green-500 text-green-500' : 'text-red-500'}
                  >
                    {tool.status}
                  </Badge>
              </div>
               <div>
                <span className="font-semibold">Kondisi: </span>
                 <Badge
                    variant={tool.condition === 'Baik' ? 'default' : 'destructive'}
                    className={tool.condition === 'Baik' ? 'bg-blue-500' : ''}
                  >
                    {tool.condition}
                  </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleRequestLoan(tool)}
                disabled={tool.status !== 'Tersedia'}
              >
                Ajukan Peminjaman
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isLoanFormOpen} onOpenChange={setLoanFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Peminjaman: {selectedTool?.name}</DialogTitle>
            <DialogDescription>
              Isi detail peminjaman di bawah ini. Permintaan Anda akan ditinjau oleh Admin.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLoanSubmit} className="grid gap-4 py-4">
             <div className="grid gap-2">
              <Label htmlFor="date">Tanggal Peminjaman</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !loanDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {loanDate ? format(loanDate, "PPP") : <span>Pilih tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={loanDate}
                    onSelect={setLoanDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
             <div className="grid gap-2">
              <Label htmlFor="notes">Keperluan</Label>
              <Textarea id="notes" placeholder="Contoh: Untuk survei patok batas di lokasi X..." required />
            </div>
            <DialogFooter>
              <Button type="submit">Kirim Permintaan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
