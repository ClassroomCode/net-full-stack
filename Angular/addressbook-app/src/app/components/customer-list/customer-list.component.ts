import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  private customerService = inject(CustomerService);
  private router = inject(Router);

  customers: Customer[] = [];
  loading = false;
  error: string | null = null;
  offset = 0;
  limit = 10;

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.error = null;
    
    this.customerService.getCustomers(this.offset, this.limit).subscribe({
      next: (customers) => {
        this.customers = customers;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load customers. Please try again.';
        this.loading = false;
        console.error('Error loading customers:', error);
      }
    });
  }

  viewCustomer(id: string): void {
    this.router.navigate(['/customers', id]);
  }

  editCustomer(id: string): void {
    this.router.navigate(['/customers', id, 'edit']);
  }

  deleteCustomer(id: string, companyName: string): void {
    if (confirm(`Are you sure you want to delete ${companyName}?`)) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.loadCustomers();
        },
        error: (error) => {
          this.error = 'Failed to delete customer. Please try again.';
          console.error('Error deleting customer:', error);
        }
      });
    }
  }

  nextPage(): void {
    this.offset += this.limit;
    this.loadCustomers();
  }

  previousPage(): void {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadCustomers();
    }
  }

  createCustomer(): void {
    this.router.navigate(['/customers/new']);
  }
}
