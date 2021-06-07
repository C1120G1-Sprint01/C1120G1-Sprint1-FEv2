import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchPostService {
  private textSearch = new BehaviorSubject('');
  currentMessage = this.textSearch.asObservable();

  constructor() {
  }

  changeKeySearch(keySearch: string) {
    this.textSearch.next(keySearch);
  }

}
