import { Address } from './address';
import { Image } from './image';

export interface Restaurant {
  id: number;

  name: string;

  cuisineType: string;

  phoneNumber: string;

  websiteUrl: string;

  averageRatings: number;

  totalReviews: number;

  address: Address;

  images: Image[];

  geolocation: Geolocation;
}
