import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import {Patient} from "../models/Patient";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewRecordService {
  apiUrl: string = 'http://localhost:8080';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  showPatientRecords():Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/getAllPatients`);
  }
  showActivatedPatientRecords():Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/activated`);
  }
  showDeactivatedPatientRecords():Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/deactivated`);
  }
}
