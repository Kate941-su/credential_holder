import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { ChevronRight, Shield, Lock, Key, Trash2, LogOut } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import colors from '@/constants/colors';

export default function SettingsScreen() {
  const [biometricUnlock, setBiometricUnlock] = React.useState(true);
  const [autoLock, setAutoLock] = React.useState(true);
  
  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to delete all your saved items? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete All", 
          onPress: () => {
            // Clear all data
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert("Data Cleared", "All your data has been deleted.");
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Lock size={20} color={colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Change Master Password</Text>
            <Text style={styles.settingDescription}>Update your vault password</Text>
          </View>
          <ChevronRight size={20} color={colors.gray} />
        </TouchableOpacity>
        
        <View style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Shield size={20} color={colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Biometric Unlock</Text>
            <Text style={styles.settingDescription}>Use Face ID or Touch ID</Text>
          </View>
          <Switch
            value={biometricUnlock}
            onValueChange={setBiometricUnlock}
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <Key size={20} color={colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Auto-Lock</Text>
            <Text style={styles.settingDescription}>Lock after 1 minute of inactivity</Text>
          </View>
          <Switch
            value={autoLock}
            onValueChange={setAutoLock}
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingIcon}>
            <LogOut size={20} color={colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Log Out</Text>
            <Text style={styles.settingDescription}>Sign out of your account</Text>
          </View>
          <ChevronRight size={20} color={colors.gray} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>
        
        <TouchableOpacity 
          style={styles.settingRow}
          onPress={handleClearData}
        >
          <View style={styles.settingIcon}>
            <Trash2 size={20} color={colors.error} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: colors.error }]}>Clear All Data</Text>
            <Text style={styles.settingDescription}>Delete all saved items</Text>
          </View>
          <ChevronRight size={20} color={colors.gray} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray,
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.gray,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    color: colors.gray,
  },
});