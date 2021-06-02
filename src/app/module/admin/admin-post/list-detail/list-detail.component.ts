import {Component, OnInit} from '@angular/core';
import {ServicePostService} from '../../../../service/service-post/service-post.service';
import {Router} from '@angular/router';
import {Post} from '../../../../model/Post';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  postList: Post[] = [];
  p: number = 1;

  constructor(private postService: ServicePostService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getListPostListDetail();
  }

  getListPostListDetail() {
    this.postService.getAllPostListDetail().subscribe(data => {
      this.postList = data.content;
    });
  }

}
