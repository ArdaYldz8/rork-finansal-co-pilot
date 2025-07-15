import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface AddTransactionButtonProps {
  onPress: () => void;
}

export default function AddTransactionButton({ onPress }: AddTransactionButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Plus size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});