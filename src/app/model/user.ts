export interface User {
  userName: string;
  userId: string;
  userRole: 'Candidate' | 'Admin';
  profileDescription: string;
  profileImage: string;
  skills: string[];
  experienceYears: number;
  isActive: boolean;
  address: Address;
  isAddSame: boolean;
}

export interface Address {
  current: CurrentAddress;
  permanent: PermanentAddress;
}

export interface CurrentAddress {
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface PermanentAddress {
  city: string;
  state: string;
  country: string;
  zipcode: string;
}