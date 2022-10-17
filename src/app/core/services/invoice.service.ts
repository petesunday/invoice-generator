import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { InvoiceItem } from '../types/invoice-item';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  invoicePreview = new BehaviorSubject<InvoiceItem[]>([]);

  invoicePreview$ = this.invoicePreview.asObservable();

  constructor() {}

  setInvoicePreview(invoiceItems: InvoiceItem[]) {
    this.invoicePreview.next(invoiceItems);
  }

  removeInvoice() {
    this.invoicePreview.next([]);
  }

  getInvoiceTotalCost() {
    return this.invoicePreview$.pipe(
      map((invoice) => {
        return invoice.reduce((sum, currentProduct) => {
          sum += currentProduct.count * currentProduct.price;
          return sum;
        }, 0);
      })
    );
  }
}
