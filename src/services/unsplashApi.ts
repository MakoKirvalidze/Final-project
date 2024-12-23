import axios from 'axios';
import { Photo, PhotoDetails, SearchResponse } from '../types/photo';
import { getCachedPhoto, getCachedSearchResults, cachePhoto, cacheSearchResults } from '../utils/cache';

const API_BASE_URL = 'https://api.unsplash.com';
const ACCESS_KEY = 'UFndtqzf8sCDxotVxiisU3xwDZ1djK4_P8MfqxHKUKo';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const fetchPhotos = async (page: number = 1): Promise<Photo[]> => {
  const response = await apiClient.get<Photo[]>('/photos', {
    params: {
      page,
      per_page: 20,
    },
  });
  return response.data;
};

export const searchPhotos = async (query: string, page: number = 1): Promise<Photo[]> => {
  // Check cache first
  const cachedResults = getCachedSearchResults(query, page);
  if (cachedResults) {
    return cachedResults;
  }

  const response = await apiClient.get<SearchResponse>('/search/photos', {
    params: {
      query,
      page,
      per_page: 20,
    },
  });

  // Cache the results
  cacheSearchResults(query, response.data.results, page);
  return response.data.results;
};

export const fetchPhotoDetails = async (id: string): Promise<PhotoDetails> => {
  // Check cache first
  const cachedPhoto = getCachedPhoto(id);
  if (cachedPhoto) {
    return cachedPhoto;
  }

  const response = await apiClient.get<PhotoDetails>(`/photos/${id}`);
  
  // Cache the photo details
  cachePhoto(response.data);
  return response.data;
};