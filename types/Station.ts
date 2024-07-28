// types.ts

export interface Brand {
  id: number;
  name: string;
  short_name: string;
  nb_stations: number;
}

export interface Address {
  street_line: string;
  city_line: string;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Update {
  value: string;
  text: string;
}

export interface Price {
  value: number;
  currency: string;
  text: string;
}

export interface Fuel {
  id: number;
  name: string;
  short_name: string;
  picto: string;
  Update: Update;
  available: boolean;
  Price: Price;
}

export interface Hours {
  automate_24_7: boolean;
  Days: string[]; // Assuming Days is an array of strings, adjust as necessary
}

export interface LastUpdate {
  value: string;
  text: string;
}

export interface Distance {
  value: number;
  text: string;
}

export interface Station {
  id: number;
  Brand: Brand;
  type: string;
  name: string;
  Address: Address;
  Coordinates: Coordinates;
  Hours: Hours;
  Fuels: Fuel[];
  LastUpdate: LastUpdate;
  distance: number;
  Distance: Distance;
}
