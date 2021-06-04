import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServicePostService} from "../../../../service/service-post/service-post.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-delete-admin',
  templateUrl: './post-delete-admin.component.html',
  styleUrls: ['./post-delete-admin.component.css']
})
export class PostDeleteAdminComponent implements OnInit {

  @Input()
  deleteId: number;
  @Input()
  deleteTitle: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  // @ts-ignore
  // @ts-ignore
  constructor(
    public postService: ServicePostService,
    public router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  deletePost() {
    this.postService.deleteByIdPost(this.deleteId).subscribe(data => {
      document.getElementById('closeModal').click();
      this.deleteComplete.emit(true);
    });
    this.toastr.success('Xóa Thành Công !', 'Bài Đăng !');
  }
}
