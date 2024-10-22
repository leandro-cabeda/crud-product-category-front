export interface Category {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: Category;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResponseT <T> {
  data: T;
  error?: String[];
  message?: String;
}
