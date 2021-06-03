import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServicePostService} from "../../../../service/service-post/service-post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cancel-approve',
  templateUrl: './cancel-approve.component.html',
  styleUrls: ['./cancel-approve.component.css']
})
export class CancelApproveComponent implements OnInit {
  @Input()
  cancelId: number;
  @Input()
  cancelTitle: string;
  @Output()
  cancelComplete = new EventEmitter<boolean>();

  constructor(private _postService: ServicePostService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onCancel() {
    this._postService.cancelApprovePost(this.cancelId).subscribe(data => {
      document.getElementById('closeModal').click();
      this.cancelComplete.emit(true);
    });
    this.toastr.success('Huỷ Duyệt Thành Công !', 'Bài Đăng !');
  }

}
