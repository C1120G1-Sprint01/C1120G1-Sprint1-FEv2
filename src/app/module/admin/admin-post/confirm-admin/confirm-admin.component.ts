import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServicePostService} from '../../../../service/service-post/service-post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Post} from '../../../../model/Post';

@Component({
  selector: 'app-confirm-admin',
  templateUrl: './confirm-admin.component.html',
  styleUrls: ['./confirm-admin.component.css']
})
export class ConfirmAdminComponent implements OnInit {
  @Input()
  approveId: number;
  @Input()
  approveTitle: string;
  @Output()
  approveComplete = new EventEmitter<boolean>();
  public postApprove: Post;

  constructor(private _postService: ServicePostService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onApprove() {
    this._postService.approvePost(this.approveId).subscribe(data => {
      document.getElementById('closeModal').click();
      this.approveComplete.emit(true);
    });
    this.toastr.success('Duyệt Thành Công !', 'Bài Đăng !');
  }
}
