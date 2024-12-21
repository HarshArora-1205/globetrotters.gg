export interface AddressObj {
  city?: string;
  state?: string;
  country: string;
  address_string: string;
}

export interface TrendingPlace {
  location_id: string;
  name: string;
  image: string;
  author: string;
  link: string;
  likes: string;
  address_obj: AddressObj;
}