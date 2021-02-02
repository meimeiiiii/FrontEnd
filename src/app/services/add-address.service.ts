import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewAddress } from 'src/app/models/address.model';





@Injectable({
  providedIn: 'root'
})
export class AddressService {

baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  create(NewAddress: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patients/addAddress/`, NewAddress);
  }

  getAllAddressByID(id: any):Observable<NewAddress[]> {
    return this.http.get<NewAddress[]>
    (`${this.baseUrl}/patients/getAllAddressByID`, {params: new HttpParams().append('id',id)});
  }


  // create(NewAddress: any, id): Observable<any> {
  //   return this.http.post(baseUrl, NewAddress, id);
  // }
}
