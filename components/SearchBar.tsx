import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useItemStore } from '@/store/itemStore';
import colors from '@/constants/colors';

export default function SearchBar() {
  const searchQuery = useItemStore((state) => state.searchQuery);
  const setSearchQuery = useItemStore((state) => state.setSearchQuery);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search vault..."
          placeholderTextColor={colors.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="never"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <X size={18} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
});