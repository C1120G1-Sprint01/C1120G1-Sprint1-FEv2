import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthLogin} from "../../model/AuthLogin";

const API_URL: string = 'http://localhost:8080/api/';

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
}
