import { Keywords } from 'main/types/Keywords';
import { Timestamp } from './Timestamp';

export interface Product {
  createdAt: number;
  name: string;
  keywords: Keywords;
  category: string;
}

export interface FirebaseProduct extends Pick<Product, 'name' | 'keywords' | 'category'> {
  createdAt: Timestamp;
}
