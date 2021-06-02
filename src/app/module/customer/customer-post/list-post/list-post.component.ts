import {Component, OnInit} from '@angular/core';
import {ServiceCustomerService} from '../../../../service/service-customer/service-customer.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  posts: any;

  constructor(private serviceCustomer: ServiceCustomerService) {
  }

  ngOnInit(): void {
    this.onList(0);
  }

  onList(page: number) {
    this.serviceCustomer.findAllPostByUsername(page).subscribe(data => {
      this.posts = data;
      console.log('List post', this.posts);
    }, error => {
      console.log('error');
    });
  }

}
