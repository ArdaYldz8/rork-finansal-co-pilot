import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { formatCurrency } from '@/utils/formatters';

interface BalanceCardProps {
  availableBalance: number;
  taxSavings: number;
}

export default function BalanceCard({ availableBalance, taxSavings }: BalanceCardProps) {
  return (
    <LinearGradient
      colors={[Colors.light.primary, '#4A7DF7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.label}>Available Balance</Text>
        <Text style={styles.balance}>{formatCurrency(availableBalance)}</Text>
        
        <View style={styles.taxContainer}>
          <Text style={styles.taxLabel}>Tax Savings</Text>
          <Text style={styles.taxAmount}>{formatCurrency(taxSavings)}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    padding: 20,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
  },
  taxContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taxLabel: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  taxAmount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});