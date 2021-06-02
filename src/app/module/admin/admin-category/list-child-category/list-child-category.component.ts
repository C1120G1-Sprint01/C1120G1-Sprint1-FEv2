import {Component, OnInit} from '@angular/core';
import {ChildCategory} from '../../../../model/ChildCategory';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-child-category',
  templateUrl: './list-child-category.component.html',
  styleUrls: ['./list-child-category.component.css']
})
export class ListChildCategoryComponent implements OnInit {
  deleteId: number;
  deleteName: string;
  childCategoryList: ChildCategory[] = [];
  childCategoryName: string = '';
  categoryName: string = '';
  p = 1;

  constructor(private serviceAdminService: ServiceAdminService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getDataChildCategory();
  }

  getDataChildCategory() {
    this.serviceAdminService.getAllChildCategory().subscribe(data => {
      console.log(data);
      this.childCategoryList = data;
    }, error => {
      console.log('lấy dữ liệu bị lỗi');
    });
  }

  getSearch() {
    console.log(this.childCategoryName);
    console.log(this.categoryName);
    this.serviceAdminService.getAllChildByChildNameAndName(this.childCategoryName, this.categoryName).subscribe(data => {
      if (data === null) {
        this.toastrService.warning('Thông tin bạn tìm kiếm hiện không có trong hệ thống ', 'Thông báo !');
      } else {
        this.childCategoryList = data;
      }
    });
  }

  deleteSuccess() {
    this.ngOnInit();
  }
}

