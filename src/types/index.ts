export interface Hospital {
  id: number;
  hospitalName: string;
  hospitalEmail: string;
  phoneNumber: string | null;
  address: string;
  country: string;
  countryCode: string;
  countryId: string;
  state: string;
  longitude: string | number;
  latitude: string | number;
  type?: string;
  distanceInKm?: number;
  distanceInMeters?: number;
  formattedDistance?: string | null;
  logoUrl?: string | null;
}

export interface Country {
  id: number;
  countryCode: string;
  phoneCode: string;
  name: string;
  nationalCurrency: string;
}

export interface HospitalFilters {
  searchQuery: string;
  selectedCountry: string;
  selectedState: string;
  hospitalType: string;
}

export interface DropdownAction {
  label: string;
  onClick: (hospital: Hospital) => void;
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
}
