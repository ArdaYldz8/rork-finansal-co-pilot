import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useFinanceStore } from '@/store/financeStore';
import BalanceCard from '@/components/BalanceCard';
import SummaryCards from '@/components/SummaryCards';
import TransactionsList from '@/components/TransactionsList';
import AddTransactionButton from '@/components/AddTransactionButton';
import AddTransactionModal from '@/components/AddTransactionModal';
import TaxSavingsCard from '@/components/TaxSavingsCard';
import Colors from '@/constants/colors';

export default function DashboardScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { transactions, financialSummary } = useFinanceStore();
  
  const recentTransactions = transactions.slice(0, 5);
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>Freelancer</Text>
        </View>
        
        <BalanceCard 
          availableBalance={financialSummary.availableBalance} 
          taxSavings={financialSummary.taxSavings} 
        />
        
        <SummaryCards 
          totalIncome={financialSummary.totalIncome} 
          totalExpenses={financialSummary.totalExpenses} 
        />
        
        <TaxSavingsCard 
          taxSavings={financialSummary.taxSavings}
          taxPercentage={financialSummary.taxPercentage}
        />
        
        <TransactionsList 
          transactions={recentTransactions} 
          title="Recent Transactions" 
          limit={5} 
        />
        
        <View style={styles.spacer} />
      </ScrollView>
      
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
  welcomeContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.light.secondaryText,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
  },
  spacer: {
    height: 80,
  },
});