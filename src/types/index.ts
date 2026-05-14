export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  price: number;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  isGuest: boolean;
}
