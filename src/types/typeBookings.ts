export interface ClientType {
  created_at?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  observations?: string;
}
interface Services {
  name: string;
}

export interface BookingType {
  id: number;
  startTime: string;
  endTime: string;
  status: string;
  totalPrice: number;
  services: Services[];
  clients: ClientType[];
}
