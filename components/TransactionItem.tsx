import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Briefcase, Code, Home, Laptop, Palette, Users, Zap } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Transaction } from '@/types/finance';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export default function TransactionItem({ transaction, onPress }: TransactionItemProps) {
  const { amount, description, category, date, type } = transaction;
  
  const getIcon = () => {
    switch (category) {
      case 'Design':
        return <Palette size={20} color={Colors.light.primary} />;
      case 'Development':
        return <Code size={20} color={Colors.light.secondary} />;
      case 'Consulting':
        return <Briefcase size={20} color="#9E7CEA" />;
      case 'Software':
        return <Laptop size={20} color={Colors.light.error} />;
      case 'Office':
        return <Home size={20} color={Colors.light.accent} />;
      case 'Utilities':
        return <Zap size={20} color="#60A5FA" />;
      case 'Meetings':
        return <Users size={20} color={Colors.light.success} />;
      default:
        return <Briefcase size={20} color={Colors.light.primary} />;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      
      <View style={styles.details}>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
        <Text style={styles.category}>{category} • {formatDate(date)}</Text>
      </View>
      
      <Text style={[
        styles.amount,
        type === 'income' ? styles.income : styles.expense
      ]}>
        {type === 'income' ? '+' : '-'} {formatCurrency(amount)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 2,
  },
  category: {
    fontSize: 14,
    color: Colors.light.secondaryText,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  income: {
    color: Colors.light.success,
  },
  expense: {
    color: Colors.light.error,
  }
});