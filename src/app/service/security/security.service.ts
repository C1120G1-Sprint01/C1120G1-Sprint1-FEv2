import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthLogin} from "../../model/AuthLogin";
import {UserSocial} from "../../model/UserSocial";

const API_URL: string = 'http://localhost:8080/api/';
const API_URL_GOOGLE: string = 'http://localhost:8080/api/login/google';
const API_URL_FACEBOOK: string = 'http://localhost:8080/api/login/facebook';
const API_ACCESS_TOKEN: string = 'https://graph.facebook.com/oauth/access_token';
const APP_ID: string = '484890752807968';
const APP_SECRET: string = '591a7458ca6ce80ee73d9597f98772e0';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  httpOptions: any;
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': "true"
    }
  }

  /**
   * Author: HoangTQ
   * login, checkEmail, saveNewPw
   */

  login(authLogin: AuthLogin): Observable<any> {
    return this.http.post<any>(API_URL + 'login', authLogin, this.httpOptions);
  }

  checkEmail(email: string): Observable<string> {
    console.log("Email on service : " + email);
    return this.http.get<string>(API_URL + 'checkEmail/' + email);
  }

  saveNewPw(newPw: string, email: string): Observable<void> {
    console.log("New pw : " + newPw);
    return this.http.get<void>(API_URL + 'setNewPw/' + email + '/' + newPw);
  }

  createUserGoogle(user: UserSocial): Observable<any> {
    return this.http.post<any>(API_URL_GOOGLE, user, this.httpOptions);
  }
  createUserFacebook(user: UserSocial): Observable<any> {
    console.log("User in Service")
    console.log(user)
    return this.http.post<any>(API_URL_FACEBOOK, user, this.httpOptions);
  }
  //
  // getAccessToken():Observable<any> {
  //   return this.http.get<any>(API_ACCESS_TOKEN+"?client_id="+APP_ID+"&client_secret="+APP_SECRET+"&grant_type=client_credentials");
  // }
}
