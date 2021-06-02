import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  // httpOptions: any;

  private API_URL_PROVINCE = "http://localhost:8080/api/address";

  constructor(private httpClient: HttpClient) {
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   }),
    //   'Access-Control-Allow-Origin': 'http://localhost:4200',
    //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //   'Access-Control-Allow-Credentials': "true"
    // }
  }

  findAllProvince(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL_PROVINCE}/province`);
  }

  findAllDistrictByProvinceId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL_PROVINCE}/district/${id}`);
  }

  findAllWardByDistrictId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL_PROVINCE}/ward/${id}`);
  }

}
