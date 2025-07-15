import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Percent } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { formatCurrency } from '@/utils/formatters';

interface TaxSavingsCardProps {
  taxSavings: number;
  taxPercentage: number;
}

export default function TaxSavingsCard({ taxSavings, taxPercentage }: TaxSavingsCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tax Savings</Text>
        <View style={styles.percentageContainer}>
          <Percent size={14} color={Colors.light.primary} />
          <Text style={styles.percentage}>{taxPercentage}%</Text>
        </View>
      </View>
      
      <Text style={styles.amount}>{formatCurrency(taxSavings)}</Text>
      <Text style={styles.description}>
        This is the amount you should set aside for taxes based on your income and tax rate.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(91, 138, 249, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.primary,
    marginLeft: 4,
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    lineHeight: 20,
  }
});