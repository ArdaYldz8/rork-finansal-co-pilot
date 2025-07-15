import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { formatCurrency } from '@/utils/formatters';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
}

export default function SummaryCards({ totalIncome, totalExpenses }: SummaryCardsProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.incomeCard]}>
        <View style={styles.iconContainer}>
          <ArrowDownLeft size={20} color={Colors.light.success} />
        </View>
        <View>
          <Text style={styles.label}>Income</Text>
          <Text style={styles.amount}>{formatCurrency(totalIncome)}</Text>
        </View>
      </View>
      
      <View style={[styles.card, styles.expenseCard]}>
        <View style={styles.iconContainer}>
          <ArrowUpRight size={20} color={Colors.light.error} />
        </View>
        <View>
          <Text style={styles.label}>Expenses</Text>
          <Text style={styles.amount}>{formatCurrency(totalExpenses)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  incomeCard: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.light.success,
  },
  expenseCard: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.light.error,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginBottom: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  }
});