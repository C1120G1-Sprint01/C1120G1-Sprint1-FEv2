import {Component, Injectable, OnInit} from '@angular/core';
import {ServicePostService} from '../../../../service/service-post/service-post.service';
import {Router} from '@angular/router';
import {Post} from '../../../../model/Post';

@Injectable({
  providedIn:'root'
})
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
      if(data == null) {
        this.postList = [];
      } else {
        this.postList = data.content;
      }
    });
  }

  deleteSuccess() {
    this.getListPostListWait();
  }

  approveSuccess() {
    this.getListPostListWait();
  }
}
