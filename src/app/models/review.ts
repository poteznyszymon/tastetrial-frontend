import { Image } from './image';
import { Restaurant } from './restaurant';
import { User } from './user';

export interface Review {
  id: number;
  content: string;
  rating: number;
  createdAt: string;
  editedAt: string;
  images: Image[];
  createdBy: User;
  restaurant: Restaurant;
  totalHelpfulVotes: number;
  votedHelpfulByCurrentUser: boolean;
}
