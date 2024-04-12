export interface UserProfileInterface {
  uid: string;
  company?: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
