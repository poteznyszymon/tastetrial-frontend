import { Image } from './image';

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  profileImage: Image | null;
  coverImage: Image | null;
  createdAt: string;
}
