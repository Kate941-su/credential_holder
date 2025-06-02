import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Eye, EyeOff, RefreshCw } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import colors from '@/constants/colors';
import { generatePassword, calculatePasswordStrength } from '@/utils/passwordGenerator';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  showGenerateButton?: boolean;
}

export default function PasswordInput({
  value,
  onChangeText,
  placeholder = "Password",
  showGenerateButton = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordStrength = calculatePasswordStrength(value);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    onChangeText(newPassword);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 30) return colors.error;
    if (passwordStrength < 60) return '#FFA500'; // Orange
    if (passwordStrength < 80) return '#FFD700'; // Gold
    return colors.success;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <View style={styles.actions}>
          {showGenerateButton && (
            <TouchableOpacity onPress={handleGeneratePassword} style={styles.actionButton}>
              <RefreshCw size={20} color={colors.primary} />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity onPress={toggleShowPassword} style={styles.actionButton}>
            {showPassword ? (
              <EyeOff size={20} color={colors.gray} />
            ) : (
              <Eye size={20} color={colors.gray} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      {value.length > 0 && (
        <View style={styles.strengthContainer}>
          <View style={styles.strengthBarContainer}>
            <View 
              style={[
                styles.strengthBar, 
                { width: `${passwordStrength}%`, backgroundColor: getStrengthColor() }
              ]} 
            />
          </View>
          <Text style={styles.strengthText}>
            {passwordStrength < 30 ? 'Weak' : 
             passwordStrength < 60 ? 'Fair' : 
             passwordStrength < 80 ? 'Good' : 'Strong'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  strengthContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  strengthBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: 8,
  },
  strengthBar: {
    height: '100%',
  },
  strengthText: {
    fontSize: 12,
    color: colors.gray,
    width: 50,
    textAlign: 'right',
  },
});