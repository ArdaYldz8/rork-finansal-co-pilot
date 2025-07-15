import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlertCircle } from 'lucide-react-native';

import { useFinanceStore } from '@/store/financeStore';
import Colors from '@/constants/colors';
import { formatCurrency } from '@/utils/formatters';

export default function InsightsScreen() {
  const { financialSummary, transactions } = useFinanceStore();
  
  // Calculate monthly income and expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  });
  
  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyExpenses = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate category breakdown
  const categoryBreakdown = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {} as Record<string, number>);
  
  const categoryData = Object.entries(categoryBreakdown)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
  
  // Calculate savings rate
  const savingsRate = financialSummary.totalIncome > 0 
    ? ((financialSummary.totalIncome - financialSummary.totalExpenses) / financialSummary.totalIncome) * 100 
    : 0;
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Overview</Text>
          <View style={styles.overviewContainer}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Income</Text>
              <Text style={styles.overviewValue}>{formatCurrency(monthlyIncome)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Expenses</Text>
              <Text style={styles.overviewValue}>{formatCurrency(monthlyExpenses)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Net</Text>
              <Text style={[
                styles.overviewValue,
                monthlyIncome - monthlyExpenses >= 0 ? styles.positive : styles.negative
              ]}>
                {formatCurrency(monthlyIncome - monthlyExpenses)}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Expense Breakdown</Text>
          {categoryData.length > 0 ? (
            categoryData.map((item, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryNameContainer}>
                  <Text style={styles.categoryName}>{item.category}</Text>
                </View>
                <View style={styles.categoryBarContainer}>
                  <View 
                    style={[
                      styles.categoryBar, 
                      { 
                        width: `${(item.amount / financialSummary.totalExpenses) * 100}%`,
                        backgroundColor: getCategoryColor(index)
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.categoryAmount}>{formatCurrency(item.amount)}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No expense data available</Text>
            </View>
          )}
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Financial Health</Text>
          <View style={styles.healthContainer}>
            <View style={styles.healthItem}>
              <Text style={styles.healthLabel}>Savings Rate</Text>
              <Text style={[
                styles.healthValue,
                savingsRate >= 20 ? styles.positive : savingsRate >= 10 ? styles.neutral : styles.negative
              ]}>
                {savingsRate.toFixed(1)}%
              </Text>
              {savingsRate < 20 && (
                <View style={styles.tipContainer}>
                  <AlertCircle size={14} color={Colors.light.accent} />
                  <Text style={styles.tipText}>
                    Aim for 20%+ savings rate for financial security
                  </Text>
                </View>
              )}
            </View>
            
            <View style={styles.healthItem}>
              <Text style={styles.healthLabel}>Tax Savings</Text>
              <Text style={styles.healthValue}>
                {formatCurrency(financialSummary.taxSavings)}
              </Text>
              <Text style={styles.healthSubtext}>
                {financialSummary.taxPercentage}% of income
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

// Helper function to get colors for category bars
const getCategoryColor = (index: number): string => {
  const colors = [
    Colors.light.primary,
    Colors.light.secondary,
    '#9E7CEA',
    Colors.light.error,
    Colors.light.accent,
    '#60A5FA',
    Colors.light.success,
  ];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  card: {
    backgroundColor: Colors.light.background,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.light.border,
  },
  positive: {
    color: Colors.light.success,
  },
  negative: {
    color: Colors.light.error,
  },
  neutral: {
    color: Colors.light.accent,
  },
  categoryItem: {
    marginBottom: 12,
  },
  categoryNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
  categoryBarContainer: {
    height: 8,
    backgroundColor: Colors.light.card,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  categoryBar: {
    height: '100%',
    borderRadius: 4,
  },
  categoryAmount: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    textAlign: 'right',
  },
  emptyState: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.secondaryText,
  },
  healthContainer: {
    gap: 16,
  },
  healthItem: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
  },
  healthLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 8,
  },
  healthValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  healthSubtext: {
    fontSize: 14,
    color: Colors.light.secondaryText,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 179, 71, 0.1)',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    gap: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.accent,
  },
  spacer: {
    height: 24,
  },
});