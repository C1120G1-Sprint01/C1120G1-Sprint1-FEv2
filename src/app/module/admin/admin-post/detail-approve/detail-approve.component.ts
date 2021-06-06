import { Component, OnInit } from '@angular/core';
import {Post} from "../../../../model/Post";
import {ServicePostService} from "../../../../service/service-post/service-post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-approve',
  templateUrl: './detail-approve.component.html',
  styleUrls: ['./detail-approve.component.css']
})
export class DetailApproveComponent implements OnInit {
  public postDetail: Post;

  constructor(private postService: ServicePostService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let index = this.activatedRoute.snapshot.params['postId'];
    this.postService.getPostApproveByIndex(index).subscribe(data => {
      this.postDetail = data;
    });
  }

}
