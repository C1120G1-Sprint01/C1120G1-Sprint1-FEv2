import { Injectable } from '@angular/core';
import {User} from "../../model/User";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Province} from "../../model/Province";
import {District} from "../../model/District";
import {Ward} from "../../model/Ward";

@Injectable({
  providedIn: 'root'
})
export class UserCustomerService {

  httpOptions:any;

  private API_URL_USER_CUSTOMER = "http://localhost:8080/user/";
  private API_UPDATE_PASSWORD="http://localhost:8080/user/resetpassword"
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': "true"
    }
  }



  getAllProvince(): Observable<Province[]> {
    return this.httpClient.get<Province[]>(this.API_URL_USER_CUSTOMER + '/province');
  }

  getAllDistrictByProvinceId(id: number): Observable<District[]> {
    return this.httpClient.get<District[]>(this.API_URL_USER_CUSTOMER + '/district/' + id);
  }

  getAllWardtByDistrictId(id: number): Observable<Ward[]> {
    return this.httpClient.get<Ward[]>(this.API_URL_USER_CUSTOMER + '/ward/' + id);
  }

  getUserById(username:string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_USER_CUSTOMER + username, this.httpOptions);
  }

  createUser(user: User): Observable<any> {
    return this.httpClient.post(this.API_URL_USER_CUSTOMER + '/create', user);
  }
}
