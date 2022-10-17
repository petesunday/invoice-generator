import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Company } from '../types/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyDataService {
  companyData$ = this.getCompanyData();

  constructor(private httpClient: HttpClient) {}

  getCompanyData(): Observable<Company> {
    return this.httpClient
      .get('/assets/company.json')
      .pipe(map((data) => data as Company));
  }
}
