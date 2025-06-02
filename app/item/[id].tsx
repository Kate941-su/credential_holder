import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Copy, Edit, Star, Trash2, Eye, EyeOff } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useItemStore } from '@/store/itemStore';
import colors from '@/constants/colors';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const items = useItemStore((state) => state.items);
  const folders = useItemStore((state) => state.folders);
  const toggleFavorite = useItemStore((state) => state.toggleFavorite);
  const deleteItem = useItemStore((state) => state.deleteItem);
  
  const item = items.find((item) => item.id === id);
  
  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item not found</Text>
      </View>
    );
  }
  
  const folderName = folders.find(f => f.id === item.folder)?.name || '';
  
  const copyToClipboard = async (text: string, label: string) => {
    await Clipboard.setStringAsync(text);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Copied", `${label} copied to clipboard`);
  };
  
  const handleEdit = () => {
    router.push(`/item/edit/${id}`);
  };
  
  const handleDelete = () => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => {
            deleteItem(id);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.back();
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const handleFavorite = () => {
    toggleFavorite(id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.name}</Text>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleFavorite}
          >
            <Star 
              size={24} 
              color={item.favorite ? colors.primary : colors.gray}
              fill={item.favorite ? colors.primary : 'transparent'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleEdit}
          >
            <Edit size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleDelete}
          >
            <Trash2 size={24} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Login Information</Text>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Username</Text>
          <View style={styles.fieldValueContainer}>
            <Text style={styles.fieldValue}>{item.username}</Text>
            <TouchableOpacity 
              onPress={() => copyToClipboard(item.username || '', 'Username')}
              style={styles.copyButton}
            >
              <Copy size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Password</Text>
          <View style={styles.fieldValueContainer}>
            <Text style={styles.fieldValue}>
              {showPassword ? item.password : '••••••••••••••••'}
            </Text>
            <View style={styles.passwordActions}>
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.copyButton}
              >
                {showPassword ? (
                  <EyeOff size={20} color={colors.gray} />
                ) : (
                  <Eye size={20} color={colors.gray} />
                )}
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => copyToClipboard(item.password || '', 'Password')}
                style={styles.copyButton}
              >
                <Copy size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Information</Text>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Folder</Text>
          <Text style={styles.fieldValue}>{folderName}</Text>
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Owner</Text>
          <Text style={styles.fieldValue}>{item.owner}</Text>
        </View>
        
        {item.notes && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Notes</Text>
            <Text style={styles.fieldValue}>{item.notes}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>History</Text>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Created</Text>
          <Text style={styles.fieldValue}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Last Updated</Text>
          <Text style={styles.fieldValue}>
            {new Date(item.updatedAt).toLocaleString()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
    padding: 4,
  },
  section: {
    backgroundColor: colors.card,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray,
    marginVertical: 8,
  },
  fieldContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  fieldLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  fieldValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldValue: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  copyButton: {
    padding: 4,
  },
  passwordActions: {
    flexDirection: 'row',
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    textAlign: 'center',
    marginTop: 40,
  },
});