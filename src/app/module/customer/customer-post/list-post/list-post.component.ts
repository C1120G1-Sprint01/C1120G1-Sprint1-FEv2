import {Component, OnInit} from '@angular/core';
import {ServiceCustomerService} from '../../../../service/service-customer/service-customer.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  posts: any;
  username: string = "username";
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

  constructor(private serviceCustomer: ServiceCustomerService) {
  }

  ngOnInit(): void {
    this.onList(0, this.username);
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
