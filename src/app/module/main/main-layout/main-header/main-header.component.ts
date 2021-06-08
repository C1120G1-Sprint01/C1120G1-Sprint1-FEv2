import {Component, Injectable, OnInit} from '@angular/core';
import {SecurityService} from "../../../../service/security/security.service";
import {TokenStorageService} from "../../../../service/security/token-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceCustomerService} from "../../../../service/service-customer/service-customer.service";
import {Router} from "@angular/router";
import {UserCustomerService} from "../../../../service/service-customer/user-customer.service";
import {User} from "../../../../model/User";
import {ListPostComponent} from "../../list-post/list-post.component";
import {LoginComponent} from "../../../security/login/login.component";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})

export class MainHeaderComponent implements OnInit {

  public searchInput: string;
  username: any = '';
  role:string = '';
  user:User;
  avatarUrl: string = "https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/login%2Fuser.jpg?alt=media&token=d3149a38-f6f3-42d2-b8bf-b79d78049b89";

  constructor(
    private securityService: SecurityService,
    private tokenStorageService: TokenStorageService,
    private headerService: ServiceCustomerService,
    private router: Router,
    private userCustomerService:UserCustomerService,
    private listPostComponent:ListPostComponent
  ) {
  }

  ngOnInit(): void {

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.role = user.authorities[0].authority;
      this.username = user.username;

      console.log("Getting username... : "+this.username);
      this.getAvatarUrl(this.username);

      if (this.username.includes("@gmail.com")){
        let i = this.username.indexOf("@gmail.com");
        this.username = this.username.slice(0, i);
        console.log(this.username);
      }

    } else {
      console.log('Not log in yet');
    }

    window.onscroll = (x => {
      this.hideHeaderOnscroll();
    })
  }

  submit() {
    this.headerService.searchPostByName(this.searchInput).subscribe(data => {
      console.log(data);
      this.listPostComponent.initData(data.content);
    });
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("/login");
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
      header.style.display = 'none';
    } else {
      header.style.display = 'block';
    }
  }

  getAvatarUrl(username:string) {
    this.userCustomerService.getUserByUserName(username).subscribe(data => {
      this.user = data;
      this.avatarUrl = this.user.avatarUrl;
      console.log("URL : "+this.avatarUrl)
    }, error => {
      console.log("get "+error+" at getAvatarUrl()");
    })
  }
}
