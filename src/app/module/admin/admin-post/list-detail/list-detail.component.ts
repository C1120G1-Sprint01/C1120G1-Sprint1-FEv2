import {Component, OnInit} from '@angular/core';
import {ServicePostService} from '../../../../service/service-post/service-post.service';
import {Router} from '@angular/router';
import {Post} from '../../../../model/Post';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  postList: Post[] = [];
  postSearch: Post;
  p: number = 1;
  cancelId: number;
  cancelTitle: string;
  keySearch = "";
  viTri = this.postList.indexOf(this.postSearch, 0);

  constructor(private postService: ServicePostService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getListPostListDetail();
  }

  getListPostListDetail() {
    this.postService.getAllPostListDetail().subscribe(data => {
      if(data == null) {
        this.postList = [];
      } else {
        this.postList = data.content;
      }
    });
  }

  cancelSuccess() {
    this.getListPostListDetail();
  }

  search() {
    this.postService.searchByTitle(this.keySearch).subscribe(data => {
      if (data == null) {
        this.toastr.warning('Không tìm thấy !', 'Bài Đăng !');
      } else {
        this.postList = data.content;
      }
    });

  }
}
