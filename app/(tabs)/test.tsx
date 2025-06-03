import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView, Alert, Button } from 'react-native';
import { ChevronRight, Shield, Lock, Key, Trash2, LogOut } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import colors from '@/constants/colors';
import * as aesjs from 'aes-js'
import * as SecureStore from 'expo-secure-store';

export default function SettingsScreen() {
  const [hash, setHash] = useState("")

  const showSasmpleKey = () => {
        const text = 'This is a secret message.';
        const textBytes = aesjs.utils.utf8.toBytes(text);
        // 128-bit key
        const key = aesjs.utils.utf8.toBytes('1234567890123456');
        // Counter must be 16 bytes
        const counter = new aesjs.Counter(5); // start at 5
        const aesCtr = new aesjs.ModeOfOperation.ctr(key, counter);
        // Encrypt
        const encryptedBytes = aesCtr.encrypt(textBytes);
        console.log('Encrypted Hex:', aesjs.utils.hex.fromBytes(encryptedBytes));
        // Decrypt
        const aesCtrDecrypt = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        const decryptedBytes = aesCtrDecrypt.decrypt(encryptedBytes);
        console.log('Decrypted:', aesjs.utils.utf8.fromBytes(decryptedBytes));
        setHash(`${aesjs.utils.utf8.fromBytes(decryptedBytes)}`)
  }

  const setStoredKey = async ({key, token}: {key: string, token: string}) => {
    const value = await SecureStore.setItemAsync(key, token);
        console.log(token)
  }

  const getStoreKey = async ({key,}: {key: string}) => {
    const value = await SecureStore.getItemAsync(key);
    console.log(value)
  }

  return (
    <ScrollView style={styles.container}>
        <View>
          <Button
            onPress = { 
              showSasmpleKey
            }
            title="Log Crypt"
            color="#FF0000"
            accessibilityLabel="Learn more about this purple button"
          />

          <Button
            onPress={() => setStoredKey({ key: 'userToken', token: 'abc123' })}
            title="Save"
            color="#FFFF00"
            accessibilityLabel="Learn more about this purple button"
          />

          <Button
            onPress={() => getStoreKey({key: 'userToken'})}
            title="Show Saved Value"
            color="#EEEEEE"
            accessibilityLabel="Learn more about this purple button"
          />
          <Text>
            {hash}
          </Text>
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
    alignItems: 'center',
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