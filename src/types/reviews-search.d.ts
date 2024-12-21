export interface UserLocation {
  id: string;
}

export interface Avatar {
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  original: string;
}

export interface User {
  username: string;
  user_location: UserLocation;
  avatar?: Avatar;
}

export interface Subrating {
  name: string;
  rating_image_url: string;
  value: number;
  localized_name: string;
}

export interface Subratings {
  [key: string]: Subrating;
}

export interface Review {
  id: number;
  lang: string;
  location_id: number;
  published_date: string;
  rating: number;
  helpful_votes: number;
  rating_image_url: string;
  url: string;
  text: string;
  title: string;
  trip_type: string;
  travel_date: string;
  user: User;
  subratings: Subratings;
}

export interface ReviewResponse {
  data: Review[];
}
