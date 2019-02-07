import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { InitialCompany, Company } from '../model/Company';

@Injectable({
  providedIn: 'root'
})

export class DumpService {

  Url: string;
  ArrCompanies: Company[];

  constructor( private http: HttpClient ) {
    this.Url = 'https://gist.githubusercontent.com/Ali925/f11d6ed501ee057d40ec6ade3dd6e2a0/raw/6022f2b3c8c4edf0740639815e163fbd1600a9b5/companies.json';
    this.ArrCompanies = [];
  }

  public getHeroes(): Observable<object> {

    return this.http.get<any>(this.Url).pipe(
      map((res: any) =>  this.modifyData(res.companies))
    );
  }

  private modifyData(companies: InitialCompany[]) {

    companies.sort((a, b) => b.monthRevenue - a.monthRevenue)
        .forEach((company: InitialCompany) => {

         this.ArrCompanies.push({
            id: company.id,
            name: company.name,
            category: company.type,
            weekStats: company.revenuePerWeek,
            balance: company.revenue,
            monthBalance: company.monthRevenue
          });
        });

    return this.ArrCompanies;
  }

}
