import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {ToastrService} from 'ngx-toastr';
import {Category} from "../../../../model/Category";
import {ChildCategory} from "../../../../model/ChildCategory";

@Component({
  selector: 'app-create-child-category',
  templateUrl: './create-child-category.component.html',
  styleUrls: ['./create-child-category.component.css']
})
export class CreateChildCategoryComponent implements OnInit {
  formCreate: FormGroup;
  categoryList = [];
  public category: Category;
  childCategory: ChildCategory[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private serviceAdminService: ServiceAdminService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.serviceAdminService.getAllCategory().subscribe(data => {
      if (data === null) {
        this.toast.warning("Dữ liệu không có", "Thông báo")
      } else {
        this.categoryList = data;
        console.log(data);
      }
    });

    this.formCreate = this.fb.group({
      childCategoryName: ['', [Validators.required, Validators.pattern(/^([\p{Lu}]|[\p{Ll}])+(\s([\p{Lu}]|[\p{Ll}])+)*$/u)]],
      // nơi chưa đối tương category cha
      category: ['', Validators.required],
    });
  }

  save() {
    if (this.formCreate.valid) {
      this.category = this.formCreate.value.category;
      this.serviceAdminService.searchAllChildCategory(this.formCreate.value.childCategoryName, this.category.categoryId).subscribe((data) => {
        this.childCategory = data;
        if (this.childCategory === null) {
          this.serviceAdminService.createChildCategory(this.formCreate.getRawValue()).subscribe(data => {
              this.toast.success('Chuyên mục con đã được tạo');
              this.router.navigateByUrl('admin/categories/child-categories');
            }
          )
        } else {
          this.toast.warning('Chuyên mục đã tồn tại')
        }
      });
    }
    if (this.formCreate.value.category === '') {
      this.toast.warning('Hãy nhập danh mục cha !')
    }
    if (this.formCreate.value.childCategoryName === '') {
      this.toast.warning('Hãy nhập danh mục con !')
    }
  }
}
