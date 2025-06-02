import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Copy, Star, MoreVertical, ExternalLink } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useItemStore } from '@/store/itemStore';
import colors from '@/constants/colors';
import { Item } from '@/types/item';

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const router = useRouter();
  const toggleFavorite = useItemStore((state) => state.toggleFavorite);
  const folders = useItemStore((state) => state.folders);
  
  const folderName = folders.find(f => f.id === item.folder)?.name || '';

  const copyUsername = async () => {
    if (item.username) {
      await Clipboard.setStringAsync(item.username);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Copied", "Username copied to clipboard");
    }
  };

  const handlePress = () => {
    router.push(`/item/${item.id}`);
  };

  const handleFavorite = () => {
    toggleFavorite(item.id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleOptions = () => {
    // Show options menu
    Alert.alert(
      item.name,
      "Choose an action",
      [
        { text: "Edit", onPress: () => router.push(`/item/edit/${item.id}`) },
        { text: "Delete", onPress: () => confirmDelete(), style: "destructive" },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => {
            useItemStore.getState().deleteItem(item.id);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.username} numberOfLines={1}>{item.username}</Text>
        <Text style={styles.folder} numberOfLines={1}>{folderName}</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={handlePress} style={styles.actionButton}>
          <ExternalLink size={20} color={colors.darkGray} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={copyUsername} style={styles.actionButton}>
          <Copy size={20} color={colors.darkGray} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleOptions} style={styles.actionButton}>
          <MoreVertical size={20} color={colors.darkGray} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={handleFavorite}
      >
        <Star 
          size={20} 
          color={item.favorite ? colors.primary : colors.gray}
          fill={item.favorite ? colors.primary : 'transparent'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  folder: {
    fontSize: 12,
    color: colors.gray,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
});