export interface ImageSize {
  height: number;
  width: number;
  url: string;
}

export interface Images {
  thumbnail: ImageSize;
  small: ImageSize;
  medium: ImageSize;
  large: ImageSize;
  original: ImageSize;
}

export interface Source {
  name: string;
  localized_name: string;
}

export interface User {
  username: string;
}

export interface Photo {
  id: number;
  is_blessed: boolean;
  caption: string;
  published_date: string;
  images: Images;
  album: string;
  source: Source;
  user: User;
}

export interface PhotoResponse {
  data: Photo[];
}