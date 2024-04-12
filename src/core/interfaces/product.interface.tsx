export interface ProductInterface {
  userId: string;
  id: string;
  reference: string;
  name: string;
  price: number;
  description?: string;
}

export interface ProductFormInterface {
  userId: string;
  reference: string;
  name: string;
  price: number;
  description: string;
}

