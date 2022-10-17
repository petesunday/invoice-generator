import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyDataService } from '../core/services/company-data.service';
import { InvoiceService } from '../core/services/invoice.service';

@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.scss'],
})
export class PreviewInvoiceComponent implements OnInit, OnDestroy {
  constructor(
    public companyDataService: CompanyDataService,
    public invoiceService: InvoiceService
  ) {}

  ngOnDestroy(): void {
    this.invoiceService.removeInvoice();
  }

  ngOnInit(): void {}
}
