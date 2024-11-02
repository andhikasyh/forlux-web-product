import { atom } from 'nanostores';

export const currentLanguage = atom('en');

export function toggleLanguage() {
  const current = currentLanguage.get();
  currentLanguage.set(current === 'en' ? 'id' : 'en');
} 