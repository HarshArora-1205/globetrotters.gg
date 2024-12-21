/* eslint-disable @typescript-eslint/no-explicit-any */

export interface AddressObj {
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
  address_string: string;
}

export interface Ancestor {
  level: string;
  name: string;
  location_id: string;
}

export interface Category {
  name: string;
  localized_name: string;
}

export interface Subcategory {
  name: string;
  localized_name: string;
}

export interface LocationDetails {
  location_id: string;
  name: string;
  description: string;
  web_url: string;
  address_obj: AddressObj;
  ancestors: Ancestor[];
  latitude: string;
  longitude: string;
  timezone: string;
  see_all_photos: string;
  category: Category;
  subcategory: Subcategory[];
  neighborhood_info: any[]; // Can be typed more specifically if needed
  awards: any[]; // Can be typed more specifically if needed
}

export interface LocationDetailsResponse {
  data: LocationDetails;
}