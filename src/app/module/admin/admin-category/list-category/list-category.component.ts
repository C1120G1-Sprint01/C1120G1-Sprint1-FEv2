import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../model/Category';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  categoryList: Category[] = [];
  p = 1;
  deleteId: number;
  deleteName: string;
  public lengthListCategory: number;

  constructor(private serviceAdminService: ServiceAdminService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getDataCategory();
  }

  getDataCategory() {
    this.serviceAdminService.getAllCategory().subscribe(data => {
      this.categoryList = data;
      if (this.categoryList === null) {
        this.toast.warning('Thông tin dữ liệu hiện không có trong hệ thống ', 'Thông báo !');
      }
    });
  }

  deleteSuccess() {
    this.ngOnInit();
  }
}
