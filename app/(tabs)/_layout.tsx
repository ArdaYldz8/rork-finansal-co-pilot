import { Tabs } from "expo-router";
import { BarChart, Home, PieChart, Settings } from "lucide-react-native";
import React, { useEffect } from "react";

import Colors from "@/constants/colors";
import { useFinanceStore } from "@/store/financeStore";

export default function TabLayout() {
  const { calculateFinancialSummary } = useFinanceStore();
  
  useEffect(() => {
    calculateFinancialSummary();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        headerShown: true,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.light.border,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => <BarChart size={22} color={color} />,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => <PieChart size={22} color={color} />,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings size={22} color={color} />,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
    </Tabs>
  );
}