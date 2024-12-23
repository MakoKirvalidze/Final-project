export interface Photo {
    id: string;
    created_at: string;
    updated_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    downloads?: number;
    likes: number;
    liked_by_user: boolean;
    description: string | null;
    alt_description: string | null;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
    user: {
      id: string;
      username: string;
      name: string;
      portfolio_url: string | null;
      bio: string | null;
      location: string | null;
      profile_image: {
        small: string;
        medium: string;
        large: string;
      };
    };
    location?: {
      name: string;
      city: string | null;
      country: string | null;
      position: {
        latitude: number | null;
        longitude: number | null;
      };
    };
  }
  
  export interface PhotoDetails extends Photo {
    downloads: number;
    exif: {
      make: string | null;
      model: string | null;
      exposure_time: string | null;
      aperture: string | null;
      focal_length: string | null;
      iso: number | null;
    };
    tags: Array<{
      title: string;
    }>;
  }
  
  export interface SearchResponse {
    total: number;
    total_pages: number;
    results: Photo[];
  }