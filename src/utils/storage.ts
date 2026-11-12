import { PlantDiagnosis } from '../types';

const STORAGE_KEYS = {
  LANGUAGE: 'rythu_lang',
  LOCALITY: 'rythu_locality',
  OFFLINE_MODE_MANUAL: 'rythu_offline_manual',
  DIAGNOSIS_HISTORY: 'rythu_diagnosis_history',
};

export const getStoredLanguage = (): 'te' | 'en' | 'hi' => {
  if (typeof window === 'undefined') return 'te';
  const val = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  if (val === 'en' || val === 'hi' || val === 'te') return val;
  return 'te'; // Default to Telugu as requested
};

export const setStoredLanguage = (lang: 'te' | 'en' | 'hi') => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  }
};

export const getStoredLocality = (): string => {
  if (typeof window === 'undefined') return 'guntur';
  return localStorage.getItem(STORAGE_KEYS.LOCALITY) || 'guntur';
};

export const setStoredLocality = (loc: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.LOCALITY, loc);
  }
};

export const getStoredOfflineMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.OFFLINE_MODE_MANUAL) === 'true';
};

export const setStoredOfflineMode = (val: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.OFFLINE_MODE_MANUAL, String(val));
  }
};

export const getSavedDiagnoses = (): PlantDiagnosis[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DIAGNOSIS_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveDiagnosis = (item: PlantDiagnosis): PlantDiagnosis[] => {
  if (typeof window === 'undefined') return [];
  const current = getSavedDiagnoses();
  const updated = [item, ...current.filter((x) => x.id !== item.id)].slice(0, 30);
  try {
    localStorage.setItem(STORAGE_KEYS.DIAGNOSIS_HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.warn('LocalStorage limit reached', err);
  }
  return updated;
};

export const removeDiagnosis = (id: string): PlantDiagnosis[] => {
  if (typeof window === 'undefined') return [];
  const current = getSavedDiagnoses();
  const updated = current.filter((x) => x.id !== id);
  localStorage.setItem(STORAGE_KEYS.DIAGNOSIS_HISTORY, JSON.stringify(updated));
  return updated;
};
