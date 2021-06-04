import { Component, OnInit } from '@angular/core';
import {Post} from "../../../../model/Post";
import {ServicePostService} from "../../../../service/service-post/service-post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-wait',
  templateUrl: './detail-wait.component.html',
  styleUrls: ['./detail-wait.component.css']
})
export class DetailWaitComponent implements OnInit {
  public postDetail: Post;

  constructor(private postService: ServicePostService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let index = this.activatedRoute.snapshot.params['postId'];
    this.postService.getPostWaitByIndex(index).subscribe(data => {
      this.postDetail = data;
    });
  }

}
