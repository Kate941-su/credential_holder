import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronDown } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useItemStore } from '@/store/itemStore';
import PasswordInput from '@/components/PasswordInput';
import colors from '@/constants/colors';
import { ItemType } from '@/types/item';

export default function NewItemScreen() {
  const router = useRouter();
  const folders = useItemStore((state) => state.folders);
  const addItem = useItemStore((state) => state.addItem);
  
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [folder, setFolder] = useState(folders[0]?.id || '');
  const [owner, setOwner] = useState('me');
  const [type, setType] = useState<ItemType>('login');
  
  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Item name is required");
      return;
    }
    
    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      type,
      username,
      password,
      notes,
      folder,
      owner,
      favorite: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    addItem(newItem);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };
  
  const handleFolderSelect = () => {
    if (folders.length === 0) {
      Alert.alert("No Folders", "You don't have any folders yet.");
      return;
    }
    
    Alert.alert(
      "Select Folder",
      "Choose a folder for this item",
      folders.map((f) => ({
        text: f.name,
        onPress: () => setFolder(f.id),
      }))
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Item details</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Item name <Text style={styles.required}>(required)</Text></Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter item name"
            placeholderTextColor={colors.gray}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Owner</Text>
          <TouchableOpacity 
            style={styles.selectInput}
            onPress={() => {}}
          >
            <Text style={styles.selectText}>{owner}</Text>
            <ChevronDown size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Folder</Text>
          <TouchableOpacity 
            style={styles.selectInput}
            onPress={handleFolderSelect}
          >
            <Text style={styles.selectText}>
              {folders.find(f => f.id === folder)?.name || 'Select folder'}
            </Text>
            <ChevronDown size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Login credentials</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor={colors.gray}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <PasswordInput
            value={password}
            onChangeText={setPassword}
            showGenerateButton
          />
          <Text style={styles.helperText}>
            Use the generator to create a strong unique password
          </Text>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add notes (optional)"
            placeholderTextColor={colors.gray}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    backgroundColor: colors.card,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  required: {
    color: colors.gray,
    fontWeight: '400',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.card,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  selectInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 16,
    color: colors.text,
  },
  helperText: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});