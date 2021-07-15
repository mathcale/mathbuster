export interface CreateCustomerRequest {
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
}
