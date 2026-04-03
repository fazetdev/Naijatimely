export interface Booking {
  id: string;
  business_id: string;
  customer_name: string;
  customer_phone: string;
  service_name: string;
  service_price: number;
  booking_time: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  reminder_sent: boolean;
  created_at: string;
}

export interface BookingCreate {
  business_id: string;
  customer_name: string;
  customer_phone: string;
  service_name: string;
  service_price: number;
  booking_time: string;
}
