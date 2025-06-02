import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, TextInput, ScrollView } from 'react-native';
import { Copy, RefreshCw } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { generatePassword, calculatePasswordStrength } from '@/utils/passwordGenerator';
import colors from '@/constants/colors';

export default function GeneratorScreen() {
  const [password, setPassword] = useState(generatePassword());
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  
  const passwordStrength = calculatePasswordStrength(password);

  const regeneratePassword = () => {
    const newPassword = generatePassword(
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    );
    setPassword(newPassword);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(password);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 30) return colors.error;
    if (passwordStrength < 60) return '#FFA500'; // Orange
    if (passwordStrength < 80) return '#FFD700'; // Gold
    return colors.success;
  };

  const getStrengthLabel = () => {
    if (passwordStrength < 30) return 'Weak';
    if (passwordStrength < 60) return 'Fair';
    if (passwordStrength < 80) return 'Good';
    return 'Strong';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.passwordContainer}>
        <Text style={styles.password}>{password}</Text>
        
        <View style={styles.passwordActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={regeneratePassword}
          >
            <RefreshCw size={20} color={colors.primary} />
            <Text style={styles.actionText}>Regenerate</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={copyToClipboard}
          >
            <Copy size={20} color={colors.primary} />
            <Text style={styles.actionText}>Copy</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.strengthContainer}>
          <View style={styles.strengthBarContainer}>
            <View 
              style={[
                styles.strengthBar, 
                { width: `${passwordStrength}%`, backgroundColor: getStrengthColor() }
              ]} 
            />
          </View>
          <Text style={styles.strengthText}>{getStrengthLabel()}</Text>
        </View>
      </View>
      
      <View style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>Options</Text>
        
        <View style={styles.lengthContainer}>
          <Text style={styles.optionLabel}>Length: {length}</Text>
          <View style={styles.lengthControls}>
            <TouchableOpacity 
              style={styles.lengthButton}
              onPress={() => setLength(Math.max(8, length - 1))}
              disabled={length <= 8}
            >
              <Text style={[styles.lengthButtonText, length <= 8 && styles.disabledText]}>-</Text>
            </TouchableOpacity>
            
            <View style={styles.lengthBarContainer}>
              <View 
                style={[
                  styles.lengthBar, 
                  { width: `${((length - 8) / 56) * 100}%` }
                ]} 
              />
            </View>
            
            <TouchableOpacity 
              style={styles.lengthButton}
              onPress={() => setLength(Math.min(64, length + 1))}
              disabled={length >= 64}
            >
              <Text style={[styles.lengthButtonText, length >= 64 && styles.disabledText]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Uppercase (A-Z)</Text>
          <Switch
            value={includeUppercase}
            onValueChange={setIncludeUppercase}
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Lowercase (a-z)</Text>
          <Switch
            value={includeLowercase}
            onValueChange={setIncludeLowercase}
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor="#fff"
            disabled={!includeUppercase && !includeNumbers && !includeSymbols}
          />
        </View>
        
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Numbers (0-9)</Text>
          <Switch
            value={includeNumbers}
            onValueChange={setIncludeNumbers}
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Special Characters (!@#$%^&*)</Text>
          <Switch
            value={includeSymbols}
            onValueChange={setIncludeSymbols}
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.generateButton}
        onPress={regeneratePassword}
      >
        <Text style={styles.generateButtonText}>Generate New Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  passwordContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  password: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  passwordActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 8,
  },
  actionText: {
    color: colors.primary,
    marginLeft: 4,
    fontWeight: '500',
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strengthBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  strengthBar: {
    height: '100%',
  },
  strengthText: {
    fontSize: 14,
    color: colors.gray,
    width: 60,
    textAlign: 'right',
  },
  optionsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  lengthContainer: {
    marginBottom: 16,
  },
  lengthControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  lengthButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lengthButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  disabledText: {
    color: colors.gray,
  },
  lengthBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  lengthBar: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  optionLabel: {
    fontSize: 16,
    color: colors.text,
  },
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});