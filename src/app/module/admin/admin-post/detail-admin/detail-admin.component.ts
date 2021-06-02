import {Component, OnInit} from '@angular/core';
import {ServicePostService} from '../../../../service/service-post/service-post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../../../model/Post';

@Component({
  selector: 'app-detail-admin',
  templateUrl: './detail-admin.component.html',
  styleUrls: ['./detail-admin.component.css']
})
export class DetailAdminComponent implements OnInit {
  public postDetail: Post;

  constructor(private postService: ServicePostService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    let index = this.activatedRoute.snapshot.params['postId'];
    this.postService.getPostDetailByIndex(index).subscribe(data => {
      this.postDetail = data;
    });
  }


}
