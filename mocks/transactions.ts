import { Transaction } from '@/types/finance';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 2500,
    description: "Website Design Project",
    category: "Design",
    date: "2025-07-10",
    type: 'income'
  },
  {
    id: '2',
    amount: 1800,
    description: "Mobile App Development",
    category: "Development",
    date: "2025-07-05",
    type: 'income'
  },
  {
    id: '3',
    amount: 120,
    description: "Software Subscription",
    category: "Software",
    date: "2025-07-12",
    type: 'expense'
  },
  {
    id: '4',
    amount: 45,
    description: "Coffee Shop - Client Meeting",
    category: "Meetings",
    date: "2025-07-14",
    type: 'expense'
  },
  {
    id: '5',
    amount: 950,
    description: "Logo Design",
    category: "Design",
    date: "2025-06-28",
    type: 'income'
  },
  {
    id: '6',
    amount: 200,
    description: "Co-working Space",
    category: "Office",
    date: "2025-07-01",
    type: 'expense'
  },
  {
    id: '7',
    amount: 85,
    description: "Internet Bill",
    category: "Utilities",
    date: "2025-07-03",
    type: 'expense'
  },
  {
    id: '8',
    amount: 1200,
    description: "Consulting Services",
    category: "Consulting",
    date: "2025-06-25",
    type: 'income'
  }
];