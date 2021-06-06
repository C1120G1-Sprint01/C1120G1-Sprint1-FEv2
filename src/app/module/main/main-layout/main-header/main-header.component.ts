import {Component, Injectable, OnInit} from '@angular/core';
import {SecurityService} from "../../../../service/security/security.service";
import {TokenStorageService} from "../../../../service/security/token-storage.service";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  roles: string[] = [];
  username: string = '';

  constructor(
    private securityService: SecurityService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      console.log('Getting username...');
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    } else {
      console.log('Reset username');
      this.username = 'Guest';
    }
  }
}
