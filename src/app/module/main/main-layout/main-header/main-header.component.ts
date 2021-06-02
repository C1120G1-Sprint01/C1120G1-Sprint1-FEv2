import {Component, Injectable, OnInit} from '@angular/core';
import {SecurityService} from "../../../../service/security/security.service";
import {TokenStorageService} from "../../../../service/security/token-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceCustomerService} from "../../../../service/service-customer/service-customer.service";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  roles: string[] = [];
  username: string = 'abc';
  public searchInput: FormGroup;

  constructor(
    private securityService: SecurityService,
    private tokenStorageService: TokenStorageService,
    private headerService: ServiceCustomerService
  ) {
  }

  ngOnInit(): void {

    this.searchInput = new FormGroup({
      posterName:new FormControl('', [Validators.required])});

    if (this.tokenStorageService.getToken()) {
      console.log('Getting username...');
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
      this.username = 'abc';
    } else {
      console.log('Reset username');
      this.username = 'abc';
    }
  }

  submit() {
    this.headerService.searchPostByName(this.searchInput.controls['posterName'].value).subscribe(data =>{
      console.log(data)
    })
  }
}
