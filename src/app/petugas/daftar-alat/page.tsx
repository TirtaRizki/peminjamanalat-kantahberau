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
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { initialTools } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Upload } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useLoans } from '@/hooks/use-loans';
import { DateRange } from 'react-day-picker';

type Tool = typeof initialTools[0];

export default function DaftarAlatPage() {
  const [tools, setTools] = useState(initialTools);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isLoanFormOpen, setLoanFormOpen] = useState(false);
  const { toast } = useToast();
  const { addLoan } = useLoans();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  const [notes, setNotes] = useState('');
  const [letter, setLetter] = useState<File | null>(null);
  const [letterFileName, setLetterFileName] = useState('');


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
  
  const resetForm = () => {
    setSelectedTool(null);
    setNotes('');
    setDate({ from: new Date(), to: addDays(new Date(), 5) });
    setLetter(null);
    setLetterFileName('');
  }

  const handleLoanSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTool || !date?.from || !date?.to || !notes || !letter) {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: 'Harap isi semua kolom peminjaman, termasuk surat pengantar.',
      });
      return;
    }

    addLoan({
      borrower: 'Petugas Lapangan 1', // In a real app, this would be the logged-in user's name
      tool: selectedTool.name,
      loanDate: format(date.from, 'yyyy-MM-dd'),
      returnDate: format(date.to, 'yyyy-MM-dd'),
      status: 'Menunggu Persetujuan',
      notes: notes,
      letter: letter.name,
    });
    
    // In a real app, you might want to update the tool's status in the backend/state
    
    toast({
      title: 'Permintaan Terkirim',
      description: `Permintaan peminjaman untuk ${selectedTool?.name} telah berhasil dikirim.`,
    });

    setLoanFormOpen(false);
    resetForm();
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
                  fill
                  className="rounded-md object-cover"
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

      <Dialog open={isLoanFormOpen} onOpenChange={(isOpen) => {
        setLoanFormOpen(isOpen);
        if (!isOpen) {
          resetForm();
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Peminjaman: {selectedTool?.name}</DialogTitle>
            <DialogDescription>
              Isi detail peminjaman di bawah ini. Permintaan Anda akan ditinjau oleh Admin.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLoanSubmit} className="grid gap-4 py-4">
             <div className="grid gap-2">
              <Label htmlFor="date">Tanggal Peminjaman & Pengembalian</Label>
               <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>
             <div className="grid gap-2">
              <Label htmlFor="notes">Keperluan</Label>
              <Textarea 
                id="notes" 
                placeholder="Contoh: Untuk survei patok batas di lokasi X..." 
                required 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="letter">Surat Pengantar (PDF/DOCX)</Label>
                <Input
                  id="letter"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                     const file = e.target.files?.[0] ?? null;
                     setLetter(file);
                     setLetterFileName(file?.name ?? '');
                  }}
                  className="hidden"
                />
                <Button asChild variant="outline">
                   <label htmlFor="letter" className="cursor-pointer w-full">
                     <Upload className="mr-2 h-4 w-4" />
                     {letterFileName || "Pilih File"}
                   </label>
                </Button>
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
