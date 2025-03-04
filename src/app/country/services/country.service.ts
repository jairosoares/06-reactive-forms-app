import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {

  private baseUrl = 'https://restcountries.com/v3.1';

  private http = inject(HttpClient);


  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {

    if (!region) return of([]);

    const url = `${ this.baseUrl }/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url);

  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {

    const url = `${ this.baseUrl }/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.http.get<Country>(url);

  }


  /**
   * Muito interessante essa funcao!
   * @param countryCodes
   * @returns
   */
  getCountryBorderByCode(countryCodes: string[]): Observable<Country[]> {
    if ( !countryCodes || countryCodes.length === 0 ) return of([]);

    // Um array de observable de http request
    const countriesRequests: Observable<Country>[] = [];
    countryCodes.forEach( code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    })
    // CombineLatest espera que todas as requisicoes se completem(se emitem) e depois de todas completadas, retornar os resultados
    //  ou seja, combina todas as requisicoes em uma só!
    // Se uma falha, o Observable falha em sua totalidade
    return combineLatest(countriesRequests);
  }

}
