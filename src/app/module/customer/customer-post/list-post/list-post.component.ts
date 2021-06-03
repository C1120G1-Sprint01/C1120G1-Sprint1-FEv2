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

  constructor(private serviceCustomer: ServiceCustomerService) {
  }

  ngOnInit(): void {
    this.onList(0, this.username);
  }

  onList(page: number, username: string) {
    this.serviceCustomer.findAllPostByUsername(page, username).subscribe(data => {
      this.posts = data;
      console.log("List post", this.posts);
    }, error => {
      console.log("error");
    });
  }

}
