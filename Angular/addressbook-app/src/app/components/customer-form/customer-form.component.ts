import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);

  customerForm!: FormGroup;
  isEditMode = false;
  customerId: string | null = null;
  loading = false;
  error: string | null = null;
  submitting = false;

  ngOnInit(): void {
    this.initForm();
    
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId && this.customerId !== 'new') {
      this.isEditMode = true;
      this.loadCustomer(this.customerId);
    }
  }

  initForm(): void {
    this.customerForm = this.fb.group({
      customerID: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      companyName: ['', Validators.required],
      contactName: [''],
      contactTitle: [''],
      address: [''],
      city: [''],
      region: [''],
      postalCode: [''],
      country: [''],
      phone: [''],
      fax: ['']
    });

    if (this.isEditMode) {
      this.customerForm.get('customerID')?.disable();
    }
  }

  loadCustomer(id: string): void {
    this.loading = true;
    this.error = null;
    
    this.customerService.getCustomer(id).subscribe({
      next: (customer) => {
        this.customerForm.patchValue(customer);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load customer. Please try again.';
        this.loading = false;
        console.error('Error loading customer:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.markFormGroupTouched(this.customerForm);
      return;
    }

    this.submitting = true;
    this.error = null;

    const formValue = this.customerForm.getRawValue();
    const customer: Customer = {
      ...formValue,
      orders: []
    };

    if (this.isEditMode && this.customerId) {
      this.customerService.updateCustomer(this.customerId, customer).subscribe({
        next: () => {
          this.router.navigate(['/customers', this.customerId]);
        },
        error: (error) => {
          this.error = 'Failed to update customer. Please try again.';
          this.submitting = false;
          console.error('Error updating customer:', error);
        }
      });
    } else {
      this.customerService.createCustomer(customer).subscribe({
        next: () => {
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          this.error = 'Failed to create customer. Please try again.';
          this.submitting = false;
          console.error('Error creating customer:', error);
        }
      });
    }
  }

  cancel(): void {
    if (this.isEditMode && this.customerId) {
      this.router.navigate(['/customers', this.customerId]);
    } else {
      this.router.navigate(['/customers']);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.customerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.customerForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'This field is required';
    }
    if (field?.hasError('minlength')) {
      return `Must be at least ${field.errors?.['minlength'].requiredLength} characters`;
    }
    if (field?.hasError('maxlength')) {
      return `Must be at most ${field.errors?.['maxlength'].requiredLength} characters`;
    }
    return '';
  }
}
