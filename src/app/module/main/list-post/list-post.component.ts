import {Component, OnInit} from '@angular/core';
import {ServicePostService} from '../../../service/service-post/service-post.service';
import {differenceInDays, differenceInHours, differenceInMinutes} from 'date-fns';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  posts: any;
  listTime: string[] = [];
  private now: Date;
  private diff: Date;
  resultTime: number = 0;

  constructor(private postService: ServicePostService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.onList(0);
  }

  onList(page: number) {
    let category = this.activatedRoute.snapshot.params['category'];
    let childCategory = this.activatedRoute.snapshot.params['childCategory'];
    console.log(category);
    console.log(childCategory);

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
      this.listTime.push(this.calculateTime(post.postDateTime));
    }
    console.log(this.listTime);
  }

  calculateTime(diff: string): string {
    console.log('Get Time');
    this.now = new Date();
    this.diff = new Date(diff);
    this.resultTime = differenceInMinutes(this.now, this.diff);
    if (this.resultTime >= (24 * 60)) {
      return differenceInDays(this.now, this.diff) + ' ngày trước';
    } else if (this.resultTime >= 60) {
      return differenceInHours(this.now, this.diff) + ' giờ trước';
    }
    return this.resultTime + ' phút trước';
  }

}
