import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BannerDTO} from "../../model/BannerDTO";

@Injectable({
  providedIn: 'root'
})
export class ServiceBannerService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', Accept: 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  public API_BANNER = 'http://localhost:8080/admin/banner';

  showAllAdvertiseBanner(): Observable<any> {
    return this.http.get(this.API_BANNER);
  }

  showAllAdvertiseBannerByPosition(positionId: number): Observable<any> {
    return this.http.get(this.API_BANNER + '/position/' + positionId);
  }

  addAdvertiseBanner(bannerDTO: BannerDTO): Observable<any> {
    return this.http.post(this.API_BANNER + '/add', bannerDTO, this.httpOptions);
  }

  editAdvertiseBanner(bannerDTO: BannerDTO): Observable<any> {
    return this.http.put(this.API_BANNER + '/edit', bannerDTO, this.httpOptions);
  }

  showAllPosition(): Observable<any> {
    return this.http.get(this.API_BANNER + '/position');
  }

  showAllSize(): Observable<any> {
    return this.http.get(this.API_BANNER + '/size');
  }

  findBannerById(bannerId: number): Observable<any> {
    return this.http.get(this.API_BANNER + '/' + bannerId);
  }

  deleteAdvertiseBanner(bannerId: number): Observable<any> {
    return this.http.delete(this.API_BANNER + '/delete/' + bannerId);
  }
}
