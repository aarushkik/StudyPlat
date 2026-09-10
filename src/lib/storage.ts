import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createChunkedStorage, type StringStorage } from './chunkedStorage';

const options: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
};
const native: StringStorage = {
  getItem: (key) => SecureStore.getItemAsync(key, options),
  setItem: (key, value) => SecureStore.setItemAsync(key, value, options),
  removeItem: (key) => SecureStore.deleteItemAsync(key, options),
};
const web: StringStorage = {
  async getItem(key) { return typeof localStorage === 'undefined' ? null : localStorage.getItem(key); },
  async setItem(key, value) {
    if (typeof localStorage === 'undefined') throw new Error('Device storage is unavailable.');
    localStorage.setItem(key, value);
  },
  async removeItem(key) { if (typeof localStorage !== 'undefined') localStorage.removeItem(key); },
};

/** Session and profile data remain in this device's protected keychain on native. */
export const deviceStorage = createChunkedStorage(Platform.OS === 'web' ? web : native);
