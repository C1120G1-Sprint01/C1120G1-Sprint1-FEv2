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

  constructor(private serviceAdminService: ServiceAdminService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getDataCategory();
  }

  getDataCategory() {
    this.serviceAdminService.getAllCategory().subscribe(data => {
      if (data === null) {
        this.toast.warning("Dữ liệu không có","Thông báo")
      }
      this.categoryList = data;
    }, error => {
      console.log('lấy dữ liệu bị lỗi');
    });
  }

  deleteSuccess() {
    this.ngOnInit();
  }
}
