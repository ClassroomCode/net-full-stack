import { Order } from './order.model';

export interface Customer {
  customerID: string;
  companyName: string;
  contactName?: string | null;
  contactTitle?: string | null;
  address?: string | null;
  city?: string | null;
  region?: string | null;
  postalCode?: string | null;
  country?: string | null;
  phone?: string | null;
  fax?: string | null;
  orders?: Order[];
}
