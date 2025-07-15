export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  availableBalance: number;
  taxSavings: number;
  taxPercentage: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}