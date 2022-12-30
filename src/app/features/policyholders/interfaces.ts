export interface PolicyholderAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface Policyholder {
  name: string;
  age: number;
  address: PolicyholderAddress;
  phoneNumber: string;
  isPrimary: boolean;
}
