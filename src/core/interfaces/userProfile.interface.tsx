export interface UserProfileInterface {
  id: string;
  uid: string;
  company?: string;
  civility : CivilityEnum.man | CivilityEnum.woman;
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


export enum CivilityEnum {
  man = "M",
  woman = "Mme"
}

export interface UserProfileFormInterface {
  company?: string;
  civility : CivilityEnum.man | CivilityEnum.woman;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}