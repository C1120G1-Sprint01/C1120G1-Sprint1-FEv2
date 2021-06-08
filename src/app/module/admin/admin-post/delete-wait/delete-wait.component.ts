import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServicePostService} from '../../../../service/service-post/service-post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Post} from '../../../../model/Post';

@Component({
  selector: 'app-delete-wait',
  templateUrl: './delete-wait.component.html',
  styleUrls: ['./delete-wait.component.css']
})
export class DeleteWaitComponent implements OnInit {
  @Input()
  deleteId: number;
  @Input()
  deleteTitle: string;
  @Output()
  deleteComplete = new EventEmitter<boolean>();
  public postDelete: Post;

  constructor(private postService: ServicePostService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onDelete() {
    this.postService.deleteWait(this.deleteId).subscribe(data => {
      document.getElementById('closeModal').click();
      this.deleteComplete.emit(true);
    });
    this.toastr.success('Xóa Thành Công !', 'Bài Đăng !');
  }

  sendEmail() {
    this.postService.sendEmailDeleteWait(this.deleteId).subscribe(data => {
    });
  }
}
