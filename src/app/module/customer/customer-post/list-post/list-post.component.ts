import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/service/security/security.service';
import { TokenStorageService } from 'src/app/service/security/token-storage.service';
import { ServiceCustomerService } from '../../../../service/service-customer/service-customer.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  posts: any;
  username: string = "";
  status = [
    {
      "statusId": "",
      "statusName": "Tất cả trạng thái"
    },
    {
      "statusId": 1,
      "statusName": "Đang bán"
    },
    {
      "statusId": 2,
      "statusName": "Đợi duyệt"
    },
    {
      "statusId": 3,
      "statusName": "Bị từ chối"
    },
    {
      "statusId": 4,
      "statusName": "Thành công"
    },
    {
      "statusId": 5,
      "statusName": "Thất bại"
    },
    {
      "statusId": 6,
      "statusName": "Để sau"
    },
  ];

  statusId = "";

  noImage: string = "https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/post%2Fnoimage-icon.jpg?alt=media&token=05c794cb-44e7-4705-8369-cb36fe0ece93";

  constructor(private serviceCustomer: ServiceCustomerService,
    private tokenStorageService: TokenStorageService,
    private securityService: SecurityService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.username = user.username;
      this.onList(0, this.username);
    } else {
      this.router.navigateByUrl("/login");
    }
    
  }

  // onList(page: number, username: string) {
  //   this.serviceCustomer.findAllPostByUsername(page, username).subscribe(data => {
  //     this.posts = data;
  //     console.log("List post", this.posts);
  //   }, error => {
  //     console.log("error");
  //   });
  // }

  onList(page: number, username: string) {
    this.serviceCustomer.findAllPostByUsername(page, username, this.statusId).subscribe(data => {
      this.posts = data;
      console.log("List post", this.posts);
    }, error => {
      console.log("error");
    });
  }

}
