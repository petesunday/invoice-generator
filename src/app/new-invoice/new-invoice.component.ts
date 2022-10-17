import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InvoiceService } from '../core/services/invoice.service';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss'],
})
export class NewInvoiceComponent implements OnInit {
  invoiceForm = this.fb.group({
    products: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.addProduct();
  }

  get products() {
    return this.invoiceForm.get('products') as FormArray;
  }

  get productControls() {
    return (this.invoiceForm.get('products') as FormArray)
      .controls as FormGroup[];
  }

  isFieldInvalid(i: number, field: string) {
    return (
      this.productControls[i].controls[field].invalid &&
      (this.productControls[i].controls[field].dirty ||
        this.productControls[i].controls[field].touched)
    );
  }

  addProduct() {
    const product = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      count: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          Validators.pattern('^[1-9][0-9]*$'),
        ],
      ],
      price: [
        0,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000000),
          Validators.pattern('^[1-9][0-9]*$'),
        ],
      ],
    });

    this.products.push(product);
  }

  deleteProduct(index: number) {
    this.products.removeAt(index);
  }

  onSubmit(): boolean {
    if (this.productControls.length === 0) {
      this.matSnackBar.open('Please add items', 'Close', {
        duration: 2000,
        panelClass: 'invoice-snackbar',
      });
      return false;
    }
    if (this.productControls.length > 0 && this.invoiceForm.invalid) {
      this.invoiceForm.controls.products.markAllAsTouched();
      return false;
    }
    this.invoiceService.setInvoicePreview(this.products.getRawValue());
    this.router.navigateByUrl('/preview');
    return true;
  }
}
