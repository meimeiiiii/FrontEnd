import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AddressService {

baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  create(NewAddress: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patients/addAddress/`, NewAddress);
  }

  // create(NewAddress: any, id): Observable<any> {
  //   return this.http.post(baseUrl, NewAddress, id);
  // }
}
