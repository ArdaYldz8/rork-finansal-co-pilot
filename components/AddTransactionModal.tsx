import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { mockCategories } from '@/mocks/categories';
import { useFinanceStore } from '@/store/financeStore';

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddTransactionModal({ visible, onClose }: AddTransactionModalProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  
  const { addTransaction } = useFinanceStore();
  
  const handleSubmit = () => {
    if (!amount || !description || !category) return;
    
    addTransaction({
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toISOString().split('T')[0],
      type
    });
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategory('');
    setType('income');
    
    onClose();
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Transaction</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={Colors.light.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.form}>
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'income' && styles.activeTypeButton
                ]}
                onPress={() => setType('income')}
              >
                <Text style={[
                  styles.typeText,
                  type === 'income' && styles.activeTypeText
                ]}>Income</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'expense' && styles.activeTypeButton
                ]}
                onPress={() => setType('expense')}
              >
                <Text style={[
                  styles.typeText,
                  type === 'expense' && styles.activeTypeText
                ]}>Expense</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor={Colors.light.secondaryText}
              />
            </View>
            
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="What was this for?"
              placeholderTextColor={Colors.light.secondaryText}
            />
            
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoriesContainer}>
              {mockCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    category === cat.name && { backgroundColor: cat.color }
                  ]}
                  onPress={() => setCategory(cat.name)}
                >
                  <Text style={[
                    styles.categoryText,
                    category === cat.name && styles.activeCategoryText
                  ]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Add Transaction</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  closeButton: {
    padding: 4,
  },
  form: {
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    marginBottom: 16,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTypeButton: {
    backgroundColor: Colors.light.primary,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.secondaryText,
  },
  activeTypeText: {
    color: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 20,
    color: Colors.light.secondaryText,
    marginRight: 4,
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 12,
    color: Colors.light.text,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  activeCategoryText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  }
});