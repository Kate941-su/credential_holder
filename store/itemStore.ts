import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item, Folder } from '@/types/item';
import { mockItems, mockFolders } from '@/constants/mockData';

interface ItemState {
  items: Item[];
  folders: Folder[];
  searchQuery: string;
  selectedFolder: string | null;
  selectedType: string | null;
  
  // Actions
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  deleteItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addFolder: (folder: Folder) => void;
  deleteFolder: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedFolder: (folderId: string | null) => void;
  setSelectedType: (type: string | null) => void;
  clearFilters: () => void;
}

export const useItemStore = create<ItemState>()(
  persist(
    (set) => ({
      items: mockItems,
      folders: mockFolders,
      searchQuery: '',
      selectedFolder: null,
      selectedType: null,
      
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),
      
      updateItem: (updatedItem) => set((state) => ({ 
        items: state.items.map((item) => 
          item.id === updatedItem.id ? updatedItem : item
        ) 
      })),
      
      deleteItem: (id) => set((state) => ({ 
        items: state.items.filter((item) => item.id !== id) 
      })),
      
      toggleFavorite: (id) => set((state) => ({ 
        items: state.items.map((item) => 
          item.id === id ? { ...item, favorite: !item.favorite } : item
        ) 
      })),
      
      addFolder: (folder) => set((state) => ({ 
        folders: [...state.folders, folder] 
      })),
      
      deleteFolder: (id) => set((state) => ({ 
        folders: state.folders.filter((folder) => folder.id !== id) 
      })),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setSelectedFolder: (folderId) => set({ selectedFolder: folderId }),
      
      setSelectedType: (type) => set({ selectedType: type }),
      
      clearFilters: () => set({ 
        searchQuery: '', 
        selectedFolder: null, 
        selectedType: null 
      }),
    }),
    {
      name: 'password-manager-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);