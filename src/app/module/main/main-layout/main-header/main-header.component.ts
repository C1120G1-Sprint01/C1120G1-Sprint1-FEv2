import {Component, Injectable, OnInit} from '@angular/core';
import {SecurityService} from "../../../../service/security/security.service";
import {TokenStorageService} from "../../../../service/security/token-storage.service";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  roles: string[] = [];
  username: any = '';

  constructor(
    private securityService: SecurityService,
    private tokenStorageService: TokenStorageService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      console.log('Getting username...');
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.roles = user.roles;
      this.username = user.username;
      console.log(this.username);
    } else {
      console.log('Reset username');
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("/login");
  }
}
