import { Customer } from './customer.model';

export interface Order {
  orderID: number;
  orderDate?: string | null;
  shippedDate?: string | null;
  customerID: string;
  customer?: Customer | null;
}
