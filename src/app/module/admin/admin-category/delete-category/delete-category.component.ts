import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  @Input()
  deleteId: number;
  @Input()
  deleteName: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  constructor(public serviceAdminService: ServiceAdminService,
              private active: ActivatedRoute,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  deleteCategory() {
    this.serviceAdminService.deleteCategory(this.deleteId).subscribe(data => {
      document.getElementById('closeModal').click();
      this.deleteComplete.emit(true);
    });
    this.toastr.success('Xóa Thành Công !', 'Chuyên mục !');
  }
}
