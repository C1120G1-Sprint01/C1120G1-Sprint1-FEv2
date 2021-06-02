import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServicePostService} from '../../../../service/service-post/service-post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Post} from '../../../../model/Post';

@Component({
  selector: 'app-wait-admin',
  templateUrl: './wait-admin.component.html',
  styleUrls: ['./wait-admin.component.css']
})
export class WaitAdminComponent implements OnInit {
  @Input()
  waitId: number;
  @Input()
  waitTitle: string;
  @Output()
  waitComplete = new EventEmitter<boolean>();
  public postWait: Post;

  constructor(private _postService: ServicePostService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onWait() {
    this._postService.waitPost(this.waitId).subscribe(data => {
      document.getElementById('closeModal').click();
      this.waitComplete.emit(true);
    });
    this.toastr.success('Chuyển Thành Công !', 'Bài Đăng !');
  }
}
