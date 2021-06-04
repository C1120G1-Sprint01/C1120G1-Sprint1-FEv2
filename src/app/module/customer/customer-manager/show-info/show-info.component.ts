import { Component, OnInit } from '@angular/core';
import {User} from "../../../../model/User";
import {UserCustomerService} from "../../../../service/service-customer/user-customer.service";
import {TokenStorageService} from "../../../../service/security/token-storage.service";

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {

  public user:User;
  username:string = '';
  constructor(private userCustomerService: UserCustomerService,
              private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {

    //set mặc định tên đăng nhập là longnhat
    this.userCustomerService.getUserById('dangkhoa').subscribe(data => {
      this.user = data;

      console.log(this.user.avatarUrl); // avatarUrl đang bị undefined
      console.log("Get data success : "+this.user);
    }, error => {
      console.log("Get "+error+" on getInfoUser()");
    });

    //method này sử dụng khi đã đăng nhập vào
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
      this.userCustomerService.getUserById(this.username).subscribe(data => {
        this.user = data;
        console.log("Get data success : "+this.user);
      }, error => {
        console.log("Get "+error+" on getInfoUser()");
      });
    }


  }

}
