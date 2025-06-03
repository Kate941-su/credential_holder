import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useItemStore } from '@/store/itemStore';
import colors from '@/constants/colors';

export default function FilterBar() {
  const folders = useItemStore((state) => state.folders);
  const selectedFolder = useItemStore((state) => state.selectedFolder);
  const selectedType = useItemStore((state) => state.selectedType);
  const setSelectedFolder = useItemStore((state) => state.setSelectedFolder);
  const setSelectedType = useItemStore((state) => state.setSelectedType);

  const itemTypes = [
    { id: 'login', name: 'Login' },
    { id: 'card', name: 'Card' },
    { id: 'identity', name: 'Identity' },
    { id: 'secure-note', name: 'Secure Note' },
  ];

  const handleFolderPress = (folderId: string) => {
    setSelectedFolder(selectedFolder === folderId ? null : folderId);
  };

  const handleTypePress = (typeId: string) => {
    setSelectedType(selectedType === typeId ? null : typeId);
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* <TouchableOpacity 
        style={[styles.filterButton, selectedFolder !== null && styles.activeFilter]}
        onPress={() => setSelectedFolder(null)}
      >
        <Text style={[styles.filterText, selectedFolder !== null && styles.activeFilterText]}>
          All Vaults
        </Text>
        <ChevronDown size={16} color={selectedFolder !== null ? colors.primary : colors.gray} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.filterButton, selectedType !== null && styles.activeFilter]}
        onPress={() => setSelectedType(null)}
      >
        <Text style={[styles.filterText, selectedType !== null && styles.activeFilterText]}>
          Type
        </Text>
        <ChevronDown size={16} color={selectedType !== null ? colors.primary : colors.gray} />
      </TouchableOpacity> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  activeFilter: {
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  filterText: {
    fontSize: 14,
    color: colors.gray,
    marginRight: 8,
  },
  activeFilterText: {
    color: colors.primary,
  },
});