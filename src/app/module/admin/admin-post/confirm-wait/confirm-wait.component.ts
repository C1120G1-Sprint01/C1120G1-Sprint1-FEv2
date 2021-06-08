import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServicePostService} from '../../../../service/service-post/service-post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Post} from '../../../../model/Post';
import {ListWaitComponent} from "../list-wait/list-wait.component";

@Component({
  selector: 'app-confirm-wait',
  templateUrl: './confirm-wait.component.html',
  styleUrls: ['./confirm-wait.component.css']
})
export class ConfirmWaitComponent implements OnInit {
  @Input()
  approveId: number;
  @Input()
  approveTitle: string;
  @Output()
  approveComplete = new EventEmitter<boolean>();
  public postApprove: Post;

  constructor(private postService: ServicePostService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private listWaitComponent:ListWaitComponent) {
  }

  ngOnInit(): void {
  }

  onApprove() {
    this.postService.approveWait(this.approveId).subscribe(data => {
      document.getElementById('closeModal').click();
      this.approveComplete.emit(true);
      this.listWaitComponent.ngOnInit();
    });
    this.toastr.success('Duyệt Thành Công !', 'Bài Đăng !');
  }
}
