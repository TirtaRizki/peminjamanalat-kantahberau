'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Loan = {
  id: string;
  borrower: string;
  tool: string;
  loanDate: string;
  returnDate: string;
  status: 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak' | 'Selesai' | 'Dipinjam';
  notes?: string;
  letter?: string; // To store the file name of the uploaded letter
};

const initialLoans: Loan[] = [
  {
    id: 'LOAN-001',
    borrower: 'Andi Wijaya',
    tool: 'Total Station',
    loanDate: '2024-08-01',
    returnDate: '2024-08-05',
    status: 'Menunggu Persetujuan',
    notes: 'Untuk survei lokasi A.',
    letter: 'surat_pengantar_andi.pdf',
  },
  {
    id: 'LOAN-002',
    borrower: 'Budi Santoso',
    tool: 'GPS Geodetik',
    loanDate: '2024-07-28',
    returnDate: '2024-08-02',
    status: 'Disetujui',
    notes: 'Untuk pematokan batas.',
    letter: 'surat_tugas_budi.docx',
  },
  {
    id: 'LOAN-003',
    borrower: 'Citra Lestari',
    tool: 'Waterpass',
    loanDate: '2024-07-25',
    returnDate: '2024-07-30',
    status: 'Selesai',
    notes: 'Pengukuran kontur.',
  },
  {
    id: 'LOAN-004',
    borrower: 'Doni Firmansyah',
    tool: 'Theodolite',
    loanDate: '2024-07-20',
    returnDate: '2024-07-22',
    status: 'Ditolak',
    notes: 'Alat tidak tersedia.',
  },
   {
    id: 'LOAN-005',
    borrower: 'Andi Wijaya',
    tool: 'Drone RTK',
    loanDate: '2024-08-10',
    returnDate: '2024-08-15',
    status: 'Dipinjam',
    notes: 'Pemetaan area perkebunan.',
    letter: 'surat_dinas_123.pdf',
  },
];

type LoanState = {
  loans: Loan[];
  addLoan: (loan: Omit<Loan, 'id'>) => void;
  removeLoan: (loanId: string) => void;
  updateLoanStatus: (loanId: string, status: Loan['status']) => void;
};

export const useLoans = create<LoanState>()(
  persist(
    (set) => ({
      loans: initialLoans,
      addLoan: (loan) =>
        set((state) => ({
          loans: [
            ...state.loans,
            { ...loan, id: `LOAN-${String(state.loans.length + 1).padStart(3, '0')}` },
          ],
        })),
      removeLoan: (loanId) =>
        set((state) => ({
          loans: state.loans.filter((loan) => loan.id !== loanId),
        })),
      updateLoanStatus: (loanId, status) =>
        set((state) => ({
          loans: state.loans.map((loan) =>
            loan.id === loanId ? { ...loan, status } : loan
          ),
        })),
    }),
    {
      name: 'loan-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
