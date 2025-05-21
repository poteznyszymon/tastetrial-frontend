import { Address } from './address';

export interface Restaurant {
  id: number;

  name: string;

  cuisineType: string;

  phoneNumber: string;

  websiteUrl: string;

  averageRatings: number;

  totalReviews: number;

  address: Address;

  geolocation: Geolocation;
}
