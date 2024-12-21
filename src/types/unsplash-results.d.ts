export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string?;
  following: string?;
  followers: string?;
}

export interface User {
  id: string;
  username: string;
  name: string;
  updated_at: string?;
  bio:string?;
  location: string?;
  first_name: string;
  last_name: string;
  instagram_username: string?;
  twitter_username: string?;
  portfolio_url: string?;
  profile_image: ProfileImage;
  links: UserLinks;
  total_collections: number?;
  total_likes: number?;
  total_promoted_photos: number?;
  total_illustrations: number?;
  total_photos: number?;
  total_promoted_illustrations: number?;
  accepted_tos: boolean;
  for_hire: boolean;
  social: SocialLinks
}

export interface SocialLinks {
  instagram_username: string?;
  portfolio_url: string?;
  twitter_username: string?;
  paypal_email: string?;
}

export interface PhotoLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface PhotoUrls {
  raw: string?;
  full: string;
  regular: string;
  small: string?;
  thumb: string?;
  small_s3: string?;
}

export interface Photo {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string?;
  alt_description: string?;
  asset_type: string;
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current_user_collections: any[]; // Replace `any` with a specific type if you have more details
  urls: PhotoUrls;
  links: PhotoLinks;
}

export interface SearchPhotosResponse {
  total: number;
  total_pages: number;
  results: Photo[];
}