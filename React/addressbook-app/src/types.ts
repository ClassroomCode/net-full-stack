export interface Order {
  orderID: number;
  orderDate: string | null;
  shippedDate: string | null;
  customerID: string;
  customer: Customer | null;
}

export interface Customer {
  customerID: string;
  companyName: string;
  contactName: string | null;
  contactTitle: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
  phone: string | null;
  fax: string | null;
  orders: Order[];
}

export interface CustomerFormData {
  customerID: string;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  fax: string;
  orders: Order[];
}
