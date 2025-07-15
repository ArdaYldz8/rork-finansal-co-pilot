import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Transaction } from '@/types/finance';
import TransactionItem from './TransactionItem';
import Colors from '@/constants/colors';

interface TransactionsListProps {
  transactions: Transaction[];
  title?: string;
  limit?: number;
}

export default function TransactionsList({ 
  transactions, 
  title = "Recent Transactions",
  limit
}: TransactionsListProps) {
  const displayTransactions = limit 
    ? transactions.slice(0, limit) 
    : transactions;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {limit && transactions.length > limit && (
          <Text style={styles.viewAll}>View All</Text>
        )}
      </View>
      
      {displayTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions yet</Text>
        </View>
      ) : (
        <FlatList
          data={displayTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          scrollEnabled={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  viewAll: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.secondaryText,
  }
});