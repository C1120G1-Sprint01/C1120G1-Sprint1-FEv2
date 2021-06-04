import {Component, Injectable, OnInit} from '@angular/core';
import {SecurityService} from "../../../../service/security/security.service";
import {TokenStorageService} from "../../../../service/security/token-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceCustomerService} from "../../../../service/service-customer/service-customer.service";
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
  public searchInput: FormGroup;
  username: any = '';


  constructor(
    private securityService: SecurityService,
    private tokenStorageService: TokenStorageService,
    private headerService: ServiceCustomerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.searchInput = new FormGroup({
      posterName: new FormControl('', [Validators.required])
    });

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


  submit() {
    this.headerService.searchPostByName(this.searchInput.controls['posterName'].value).subscribe(data => {
      console.log(data)
    });
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("/login");
  }
}
