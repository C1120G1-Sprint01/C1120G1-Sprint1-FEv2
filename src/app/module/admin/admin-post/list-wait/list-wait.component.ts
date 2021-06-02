import {Component, OnInit} from '@angular/core';
import {ServicePostService} from '../../../../service/service-post/service-post.service';
import {Router} from '@angular/router';
import {Post} from '../../../../model/Post';

@Component({
  selector: 'app-list-wait',
  templateUrl: './list-wait.component.html',
  styleUrls: ['./list-wait.component.css']
})
export class ListWaitComponent implements OnInit {
  p: number = 1;
  postList: Post[] = [];
  approveId: number;
  approveTitle: string;
  deleteId: number;
  deleteTitle: string;

  constructor(private postService: ServicePostService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getListPostListWait();
  }

  getListPostListWait() {
    this.postService.getAllPostListWait().subscribe(data => {
      console.log('Get success' + JSON.stringify(data));
      console.log(data.content);
      this.postList = data.content;
    }, error => {
      console.log('get ' + error + ' on MainAdminComponent at getListPostDetail');
    });
  }

  deleteSuccess() {
    this.ngOnInit();
  }

  approveSuccess() {
    this.ngOnInit();
  }
}
