import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, FinancialSummary } from '@/types/finance';
import { mockTransactions } from '@/mocks/transactions';

interface FinanceState {
  transactions: Transaction[];
  taxPercentage: number;
  financialSummary: FinancialSummary;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: string) => void;
  updateTaxPercentage: (percentage: number) => void;
  calculateFinancialSummary: () => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      taxPercentage: 30,
      financialSummary: {
        totalIncome: 0,
        totalExpenses: 0,
        availableBalance: 0,
        taxSavings: 0,
        taxPercentage: 30
      },
      addTransaction: (transaction) => {
        const newTransaction = {
          ...transaction,
          id: Date.now().toString(),
        };
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
        get().calculateFinancialSummary();
      },
      removeTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
        get().calculateFinancialSummary();
      },
      updateTaxPercentage: (percentage) => {
        set({ taxPercentage: percentage });
        get().calculateFinancialSummary();
      },
      calculateFinancialSummary: () => {
        const { transactions, taxPercentage } = get();
        
        const totalIncome = transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        
        const totalExpenses = transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
        
        const taxSavings = totalIncome * (taxPercentage / 100);
        const availableBalance = totalIncome - totalExpenses - taxSavings;
        
        set({
          financialSummary: {
            totalIncome,
            totalExpenses,
            availableBalance,
            taxSavings,
            taxPercentage
          }
        });
      }
    }),
    {
      name: 'finance-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);