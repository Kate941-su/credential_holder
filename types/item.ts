export type ItemType = 'login' | 'card' | 'identity' | 'secure-note';

export type Item = {
  id: string;
  name: string;
  type: ItemType;
  username?: string;
  password?: string;
  notes?: string;
  folder: string;
  owner: string;
  favorite: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Folder {
  id: string;
  name: string;
}