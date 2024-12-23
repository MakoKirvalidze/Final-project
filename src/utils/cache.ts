import { Photo, PhotoDetails } from '../types/photo';

const CACHE_PREFIX = 'unsplash_cache_';
const CACHE_EXPIRY = 1000 * 60 * 30;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export const setCacheItem = <T>(key: string, data: T) => {
  const cacheItem: CacheItem<T> = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
};

export const getCacheItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
  if (!item) return null;

  const cacheItem: CacheItem<T> = JSON.parse(item);
  if (Date.now() - cacheItem.timestamp > CACHE_EXPIRY) {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    return null;
  }

  return cacheItem.data;
};

export const cachePhoto = (photo: PhotoDetails) => {
  setCacheItem(`photo_${photo.id}`, photo);
};

export const getCachedPhoto = (id: string): PhotoDetails | null => {
  return getCacheItem(`photo_${id}`);
};

export const cacheSearchResults = (query: string, photos: Photo[], page: number) => {
  setCacheItem(`search_${query}_${page}`, photos);
};

export const getCachedSearchResults = (query: string, page: number): Photo[] | null => {
  return getCacheItem(`search_${query}_${page}`);
};