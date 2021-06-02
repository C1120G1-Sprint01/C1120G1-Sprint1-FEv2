import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServicePostService} from '../../../../service/service-post/service-post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Post} from '../../../../model/Post';

@Component({
  selector: 'app-delete-post-admin',
  templateUrl: './delete-post-admin.component.html',
  styleUrls: ['./delete-post-admin.component.css']
})
export class DeletePostAdminComponent implements OnInit {
  @Input()
  deleteId: number;
  @Input()
  deleteTitle: string;
  @Output()
  deleteComplete = new EventEmitter<boolean>();
  public postDelete: Post;

  constructor(private _postService: ServicePostService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    // let index = this._activatedRoute.snapshot.params["postId"];
    // this._postService.getPostApproveByIndex(index).subscribe(data => {
    //   this.postDelete = data;
    // });
  }

  onDelete() {
    // this._postService.deletePost(this.postDelete.postId).subscribe(data => {
    //   this._router.navigateByUrl("/admin/listApprove");
    // });
    this._postService.deletePost(this.deleteId).subscribe(data => {
      document.getElementById('closeModal').click();
      this.deleteComplete.emit(true);
    });
    this.toastr.success('Xóa Thành Công !', 'Bài Đăng !');
  }
}
