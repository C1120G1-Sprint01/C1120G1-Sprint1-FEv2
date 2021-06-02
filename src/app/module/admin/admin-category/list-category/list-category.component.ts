import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../model/Category';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  categoryList: Category[] = [];
  p = 1;

  constructor(private serviceAdminService: ServiceAdminService) {
  }

  ngOnInit(): void {
    this.getDataCategory();
  }

  getDataCategory() {
    this.serviceAdminService.getAllCategory().subscribe(data => {
      this.categoryList = data;
    }, error => {
      console.log('lấy dữ liệu bị lỗi');
    });
  }
}
