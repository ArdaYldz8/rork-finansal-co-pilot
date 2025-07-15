import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Filter } from 'lucide-react-native';

import { useFinanceStore } from '@/store/financeStore';
import TransactionsList from '@/components/TransactionsList';
import AddTransactionButton from '@/components/AddTransactionButton';
import AddTransactionModal from '@/components/AddTransactionModal';
import Colors from '@/constants/colors';

export default function TransactionsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'income' | 'expense'>('all');
  const { transactions } = useFinanceStore();
  
  const filteredTransactions = transactions.filter(transaction => {
    if (activeFilter === 'all') return true;
    return transaction.type === activeFilter;
  });
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'all' && styles.activeFilter]}
          onPress={() => setActiveFilter('all')}
        >
          <Text style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'income' && styles.activeFilter]}
          onPress={() => setActiveFilter('income')}
        >
          <Text style={[styles.filterText, activeFilter === 'income' && styles.activeFilterText]}>
            Income
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'expense' && styles.activeFilter]}
          onPress={() => setActiveFilter('expense')}
        >
          <Text style={[styles.filterText, activeFilter === 'expense' && styles.activeFilterText]}>
            Expenses
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterIconButton}>
          <Filter size={18} color={Colors.light.text} />
        </TouchableOpacity>
      </View>
      
      <TransactionsList 
        transactions={filteredTransactions} 
        title={`${activeFilter === 'all' ? 'All' : activeFilter === 'income' ? 'Income' : 'Expense'} Transactions`} 
      />
      
      <AddTransactionButton onPress={() => setModalVisible(true)} />
      
      <AddTransactionModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
  },
  activeFilter: {
    backgroundColor: Colors.light.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.secondaryText,
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  filterIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
});