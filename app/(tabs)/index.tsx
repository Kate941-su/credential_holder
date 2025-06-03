import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, Filter } from 'lucide-react-native';
import { useItemStore } from '@/store/itemStore';
import ItemCard from '@/components/ItemCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import colors from '@/constants/colors';
import { Item } from '@/types/item';

export default function VaultScreen() {
  const router = useRouter();
  const items = useItemStore((state) => state.items);
  const searchQuery = useItemStore((state) => state.searchQuery);
  const selectedFolder = useItemStore((state) => state.selectedFolder);
  const selectedType = useItemStore((state) => state.selectedType);
  
  // Filter items based on search query and filters
  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.username && item.username.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFolder = selectedFolder === null || item.folder === selectedFolder;
    const matchesType = selectedType === null || item.type === selectedType;
    
    return matchesSearch && matchesFolder && matchesType;
  });

  const handleAddItem = () => {
    router.push('/item/new');
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No items found</Text>
      <Text style={styles.emptyText}>
        {searchQuery || selectedFolder || selectedType
          ? "Try adjusting your search or filters"
          : "Add your first item to get started"}
      </Text>
      {!searchQuery && !selectedFolder && !selectedType && (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddItem}
        >
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar />
      {/* <FilterBar /> */}
      
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>
          {filteredItems.length === 0 
            ? 'No items' 
            : filteredItems.length === 1 
              ? '1 item' 
              : `${filteredItems.length} items`}
        </Text>
      </View>
      
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
      />
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleAddItem}
      >
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});