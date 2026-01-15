import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);

  customer: Customer | null = null;
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCustomer(id);
    }
  }

  loadCustomer(id: string): void {
    this.loading = true;
    this.error = null;
    
    this.customerService.getCustomer(id).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load customer details. Please try again.';
        this.loading = false;
        console.error('Error loading customer:', error);
      }
    });
  }

  editCustomer(): void {
    if (this.customer) {
      this.router.navigate(['/customers', this.customer.customerID, 'edit']);
    }
  }

  deleteCustomer(): void {
    if (this.customer && confirm(`Are you sure you want to delete ${this.customer.companyName}?`)) {
      this.customerService.deleteCustomer(this.customer.customerID).subscribe({
        next: () => {
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          this.error = 'Failed to delete customer. Please try again.';
          console.error('Error deleting customer:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/customers']);
  }
}
