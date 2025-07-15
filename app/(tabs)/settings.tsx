import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, TextInput, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, CreditCard, HelpCircle, LogOut, Percent, Shield, User } from 'lucide-react-native';

import { useFinanceStore } from '@/store/financeStore';
import Colors from '@/constants/colors';

export default function SettingsScreen() {
  const { taxPercentage, updateTaxPercentage } = useFinanceStore();
  const [localTaxPercentage, setLocalTaxPercentage] = useState(taxPercentage.toString());
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  const handleTaxPercentageChange = (value: string) => {
    setLocalTaxPercentage(value);
  };
  
  const saveTaxPercentage = () => {
    const newPercentage = parseInt(localTaxPercentage, 10);
    if (isNaN(newPercentage) || newPercentage < 0 || newPercentage > 100) {
      Alert.alert('Invalid Value', 'Please enter a valid percentage between 0 and 100.');
      setLocalTaxPercentage(taxPercentage.toString());
      return;
    }
    
    updateTaxPercentage(newPercentage);
    Alert.alert('Success', 'Tax percentage updated successfully.');
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <User size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Profile</Text>
              <Text style={styles.settingDescription}>Manage your personal information</Text>
            </View>
            <ChevronRight size={20} color={Colors.light.secondaryText} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <CreditCard size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Payment Methods</Text>
              <Text style={styles.settingDescription}>Add or remove payment options</Text>
            </View>
            <ChevronRight size={20} color={Colors.light.secondaryText} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tax Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Percent size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Tax Percentage</Text>
              <Text style={styles.settingDescription}>Set aside for quarterly tax payments</Text>
            </View>
          </View>
          
          <View style={styles.taxInputContainer}>
            <TextInput
              style={styles.taxInput}
              value={localTaxPercentage}
              onChangeText={handleTaxPercentageChange}
              keyboardType="numeric"
              maxLength={3}
            />
            <Text style={styles.percentSymbol}>%</Text>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={saveTaxPercentage}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.taxNote}>
            This percentage will be used to calculate how much of your income should be set aside for taxes.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingToggleItem}>
            <Text style={styles.settingTitle}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingToggleItem}>
            <Text style={styles.settingTitle}>Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Help Center</Text>
              <Text style={styles.settingDescription}>Get help with the app</Text>
            </View>
            <ChevronRight size={20} color={Colors.light.secondaryText} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Privacy Policy</Text>
              <Text style={styles.settingDescription}>How we protect your data</Text>
            </View>
            <ChevronRight size={20} color={Colors.light.secondaryText} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={Colors.light.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
        
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  section: {
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondaryText,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(91, 138, 249, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.light.secondaryText,
  },
  settingToggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  taxInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  taxInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.light.text,
  },
  percentSymbol: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.light.text,
    marginHorizontal: 8,
  },
  saveButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  taxNote: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    borderRadius: 8,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.error,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginTop: 16,
  },
  spacer: {
    height: 24,
  },
});