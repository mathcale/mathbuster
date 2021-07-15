export interface Customer {
  id: string;
  name: string;
  age: number;
  email?: string;
  phone: string;
  favoriteGenres?: string[];
  address: string;
  complement?: string;
  number: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  secret: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
