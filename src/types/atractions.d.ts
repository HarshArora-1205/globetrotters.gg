export interface Location {
  location_id: string; 
  name: string; 
  distance: string; 
  bearing: string; 
  address_obj: Address; 
}

export interface Address {
  street1: string; 
  street2?: string; 
  city: string; 
  state: string; 
  country: string; 
  postalcode: string; 
  address_string: string; 
}

export interface LocationData {
  data: Location[]; 
}