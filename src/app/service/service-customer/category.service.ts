import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  httpOptions: any;

  private API_URL_CATEGORY = "http://localhost:8080/api/category";
  private API_URL_CHILD_CATEGORY = "http://localhost:8080/api/child-category";

  constructor(private _httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': "true"
    }
  }

  findAllCategory(): Observable<any> {
    return this._httpClient.get<any>(this.API_URL_CATEGORY);
  }

  findAllChildCategoryByCategoryId(id: number): Observable<any> {
    return this._httpClient.get<any>(this.API_URL_CHILD_CATEGORY+'/'+id);
  }
}
