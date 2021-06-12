import {Component, Injectable, OnInit} from '@angular/core';
import {ServicePostService} from '../../../service/service-post/service-post.service';
import {MainContentComponent} from "../main-layout/main-content/main-content.component";
import {ActivatedRoute} from "@angular/router";
import {DateUtilService} from "../../../service/date-util/date-util.service";
import {Post} from "../../../model/Post";

const defaultNum: number = 4;
@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  defaultImgUrl: string = 'https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/post%2Fnoimage-icon.jpg?'
    + 'alt=media&token=05c794cb-44e7-4705-8369-cb36fe0ece93';
  listPost: any;
  listTime: string[] = [];
  listPostData: Post[] = [];
  public count: number = defaultNum;

  constructor(
    private postService: ServicePostService,
    private activatedRoute: ActivatedRoute,
    private mainContentComponent: MainContentComponent,
    private dateUtilService: DateUtilService) {
  }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById("search-input")).value = '';
    this.onList(this.count);
    this.mainContentComponent.ngOnInit();
  }

  initData(data: any) {
    this.listPost = data;
    this.listPostData = data.content;
    for (let post of this.listPostData) {
      this.listTime.push(this.dateUtilService.getDiffToNow(post.postDateTime));
    }
    // console.log(this.listTime);
  }

  onList(count: number) {
    let category = this.activatedRoute.snapshot.params['category'];
    let childCategory = this.activatedRoute.snapshot.params['childCategory'];

    if (category) {
      if (childCategory) {
        this.postService.getAllPostByCategoryNameAndChildCategoryName(category, childCategory, count).subscribe(data => {
          this.initData(data);
        }, error => {
          console.log('error: ' + error);
        });
      } else {
        this.postService.getAllPostByCategoryName(category, count).subscribe(data => {
          this.initData(data);
        }, error => {
          console.log('error: ' + error);
        });
      }
    } else {
      this.postService.getListPost(count).subscribe(data => {
        this.initData(data);
      }, error => {
        console.log('error: ' + error);
      });
    }
  }

  loadMore() {
    this.count += defaultNum;
    this.onList(this.count);
  }
}
