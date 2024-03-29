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
  private API_URL_USER_CUSTOMER = "http://localhost:8080/user/";
  API_USER: string = "http://localhost:8080/user";
  API_URL_ADDRESS: string = "http://localhost:8080/api/address";
  httpOptions: any;


  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }

  getAllProvince(): Observable<Province[]> {
    return this.httpClient.get<Province[]>(this.API_URL_ADDRESS + '/province');
  }

  getAllDistrictByProvinceId(id: number): Observable<District[]> {
    return this.httpClient.get<District[]>(this.API_URL_ADDRESS + '/district/' + id);
  }

  getAllWardByDistrictId(id: number): Observable<Ward[]> {
    return this.httpClient.get<Ward[]>(this.API_URL_ADDRESS + '/ward/' + id);
  }

  getUserByUserName(username: string): Observable<User> {
    return this.httpClient.get<User>(this.API_URL_USER_CUSTOMER + username);
  };

  createUser(user: User): Observable<any> {
    return this.httpClient.post(this.API_USER + '/create', user);
  }
  getPass(username: string, password: string): Observable<boolean> {
    return this.httpClient.post<boolean>(this.API_USER + '/getPass/' + username + '/' + password, this.httpOptions)
  }

  setNewPassword(username: string, newPassword: string): Observable<void> {
    return this.httpClient.post<void>(this.API_USER + '/setPass/' + username + '/' + newPassword, this.httpOptions);
  }

}
