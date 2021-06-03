import { Component, OnInit } from '@angular/core';
import {User} from "../../../../model/User";
import {UserCustomerService} from "../../../../service/service-customer/user-customer.service";

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {

  public userInfo: User[] = [];
  constructor(private userCustomerService: UserCustomerService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.userCustomerService.getUserById().subscribe(data => {
      this.userInfo = data;
    }, error => {
      console.log("Get "+error+" on getInfoUser()");
    });
  }

}
