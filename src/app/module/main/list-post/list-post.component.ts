import {Component, OnInit} from '@angular/core';
import {ServicePostService} from '../../../service/service-post/service-post.service';
import {ActivatedRoute} from "@angular/router";
import {DateUtilService} from "../../../service/date-util/date-util.service";

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  defaultImgUrl: string = 'https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/post%2Fnoimage-icon.jpg?'
    + 'alt=media&token=05c794cb-44e7-4705-8369-cb36fe0ece93';

  posts: any;
  listTime: string[] = [];

  constructor(private postService: ServicePostService,
              private activatedRoute: ActivatedRoute,
              private dateUtilService: DateUtilService) {
  }

  ngOnInit(): void {
    this.onList(0);
  }

  onList(page: number) {
    let category = this.activatedRoute.snapshot.params['category'];
    let childCategory = this.activatedRoute.snapshot.params['childCategory'];

    if (category) {
      if (childCategory) {
        this.postService.getAllByCategoryNameAndChildCategoryName(category, childCategory, page).subscribe(data => {
          this.initData(data);
        }, error => {
          console.log('error: ' + error);
        });
      } else {
        this.postService.getAllByCategoryName(category, page).subscribe(data => {
          this.initData(data);
        }, error => {
          console.log('error: ' + error);
        });
      }
    } else {
      this.postService.getListPost(page).subscribe(data => {
        this.initData(data);
      }, error => {
        console.log('error: ' + error);
      });
    }
  }

  initData(data: any) {
    this.posts = data;
    for (let post of this.posts.content) {
      this.listTime.push(this.dateUtilService.getDiffToNow(post.postDateTime));
    }
    console.log(this.listTime);
  }

}
