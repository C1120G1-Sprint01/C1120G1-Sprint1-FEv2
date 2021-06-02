import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private API_URL_PROVINCE = "http://localhost:8080/api/address";

  constructor(private httpClient: HttpClient) { }

  findAllProvince():Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL_PROVINCE}/province`);
  }

  findAllDistrictByProvinceId(id: number):Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL_PROVINCE}/district/${id}`);
  }

  findAllWardByDistrictId(id: number):Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL_PROVINCE}/ward/${id}`);
  }

}
