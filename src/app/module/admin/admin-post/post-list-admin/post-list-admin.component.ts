import { Component, OnInit } from '@angular/core';
import {Post} from "../../../../model/Post";
import {ServicePostService} from "../../../../service/service-post/service-post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post-list-admin',
  templateUrl: './post-list-admin.component.html',
  styleUrls: ['./post-list-admin.component.css']
})
export class PostListAdminComponent implements OnInit {

  postList: Post [] = [];

  deleteId: number;
  deleteTitle: string;
  public postId = '';
  public posterName = '';

  textSorting = "";
  size = 5;
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  onSorting = false;

  // @ts-ignore
  constructor(private _postService: ServicePostService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.onSubmit(0);
  }
  deleteSuccess() {
    this.ngOnInit();
  }

  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }

  onFirst() {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.onSubmit(this.pageClicked);
  }

  onSubmit(page) {
    this.postId = '';
    this.posterName = '';
    this._postService.findAll(page, this.size, this.onSorting, this.textSorting).subscribe(
      data => {
        this.postList = data.content;
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => {
        if (error.status === 204) {
        }
      }
    );
  }

  onSortingChange(value) {
    this.onSorting = !this.onSorting;
    this.textSorting = value;
    this.ngOnInit();
  }
}

