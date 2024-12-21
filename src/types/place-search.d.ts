export interface AddressObj {
  street1?: string;
  street2?: string;
  city: string;
  state: string;
  country: string;
  postalcode?: string;
  address_string: string;
}

export interface Location {
  location_id: string;
  name: string;
  address_obj: AddressObj;
}

export interface TripAdvisorResponse {
  data: Location[];
}