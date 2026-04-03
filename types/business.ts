export interface Service {
  name: string;
  duration: number;
  price: number;
}

export interface DayHours {
  open: string | null;
  close: string | null;
  closed: boolean;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface Business {
  id: string;
  name: string;
  whatsapp: string;
  slug: string;
  access_code: string;
  services: Service[];
  hours: BusinessHours;
  paid: boolean;
  trial_end: string;
  created_at: string;
}
