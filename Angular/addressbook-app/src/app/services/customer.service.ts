import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/customer';

  getCustomers(offset: number = 0, limit: number = 10): Observable<Customer[]> {
    const params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());
    
    return this.http.get<Customer[]>(this.apiUrl, { params });
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: Customer): Observable<void> {
    return this.http.post<void>(this.apiUrl, customer);
  }

  updateCustomer(id: string, customer: Customer): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
