import {Component, OnInit} from '@angular/core';
import {ServicePostService} from '../../../../service/service-post/service-post.service';
import {Post} from '../../../../model/Post';
declare var $: any;

@Component({
  selector: 'app-list-approve',
  templateUrl: './list-approve.component.html',
  styleUrls: ['./list-approve.component.css']
})
export class ListApproveComponent implements OnInit {

  p: number = 1;
  postList: Post[] = [];
  deleteId: number;
  deleteTitle: string;
  approveId: number;
  approveTitle: string;
  waitId: number;
  waitTitle: string;

  constructor(private postService: ServicePostService) {
    console.log("constructor");
  }

  ngOnInit(): void {
    this.getListPostListApprove();
    console.log("init");
  }

  getListPostListApprove() {
    this.postService.getAllPostListApprove().subscribe(data => {
      console.log('Get success' + JSON.stringify(data));
      this.postList = data.content;
    }, error => {
      console.log('get ' + error + ' on MainAdminComponent at getListPostApprove');
    });
  }

  deleteSuccess() {
    this.getListPostListApprove();
  }

  approveSuccess() {
    this.getListPostListApprove();
  }

  waitSuccess() {
    this.getListPostListApprove();
  }

  // openModal() {
  //   $("#approveModal").modal('show');
  // }  cach 2
}
