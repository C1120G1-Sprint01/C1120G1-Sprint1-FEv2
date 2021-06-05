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
  role:string = 'a';
  avatarUrl: string = 'https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/login%2Fuser.png?alt=media&token=17b5d64b-f4fc-4723-a694-3acc51abe7b3';


  constructor(
    private securityService: SecurityService,
    private tokenStorageService: TokenStorageService,
    private headerService: ServiceCustomerService,
    private router:Router
  ) {
  }

  ngOnInit(): void {

    this.searchInput = new FormGroup({
      posterName:new FormControl('', [Validators.required])});

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.role = user.authorities[0].authority;
      this.username = user.username;
      console.log("Getting username... : "+this.username);
    } else {
      console.log('Not log in yet');
    }

    window.onscroll = (x => {
      this.hideHeaderOnscroll();
    })
  }

  submit(){
    this.headerService.searchPostByName(this.searchInput.controls['posterName'].value).subscribe(data => {
    console.log(data)
    });
  }

  logout(){
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("login");
  }

  showProfile() {
    document.getElementById("profile").style.display = 'block';
  }

  hideProfile() {
    document.getElementById("profile").style.display = 'none';
  }

  hideHeaderOnscroll() {
    let header = document.getElementById('header');
    if (document.documentElement.scrollTop > 50) {
      header.style.display = 'none'
    } else {
      header.style.display = 'block'
    }
  }
}
