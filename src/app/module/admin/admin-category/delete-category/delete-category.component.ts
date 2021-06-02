import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../model/Category';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  categoryDelete: Category;

  constructor(public serviceAdminService: ServiceAdminService,
              private active: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    let id = this.active.snapshot.params['id'];

    this.serviceAdminService.getCategoryById(id).subscribe((data: Category) => {

      this.categoryDelete = data;
    });
  }

  deleteCategory(id: number) {
    this.serviceAdminService.deleteCategory(id).subscribe(data => {
      this.router.navigateByUrl('main-category/category');
      console.log('xóa thành công!');
    });
  }
}
