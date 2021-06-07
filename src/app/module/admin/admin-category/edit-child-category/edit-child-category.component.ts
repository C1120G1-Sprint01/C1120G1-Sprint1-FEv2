import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {Category} from '../../../../model/Category';
import {ChildCategory} from '../../../../model/ChildCategory';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-child-category',
  templateUrl: './edit-child-category.component.html',
  styleUrls: ['./edit-child-category.component.css']
})
export class EditChildCategoryComponent implements OnInit {
  formEdit: FormGroup;
  childCategoryEdit: ChildCategory;
  categoryList: Category[];
  childCategoryId;

  constructor(private fb: FormBuilder,
              private router: Router,
              private serviceAdminService: ServiceAdminService,
              private active: ActivatedRoute,
              private toast: ToastrService) {

    //lấy danh sách category hiển thị cho người dùng chọn lại
    this.serviceAdminService.getAllCategory().subscribe(data => {
      this.categoryList = data;
      console.log(data);

    });

  }

  ngOnInit(): void {

    // let id = this.active.snapshot.params['id'];

    this.formEdit = this.fb.group({
      childCategoryId: [''],
      childCategoryName: ['', [Validators.required, Validators.pattern(/^([\p{Lu}]|[\p{Ll}])+(\s([\p{Lu}]|[\p{Ll}])+)*$/u)]],
      // nơi chưa đối tương category cha
      category: [''],
    });

    //lấy lại dữ liệu người dùng đã thêm trước đó để chỉnh sửa
    this.active.paramMap.subscribe((data: ParamMap) => {
      this.childCategoryId = data.get('id');
      this.serviceAdminService.getChildCategoryById(this.childCategoryId).subscribe((data: ChildCategory) => {
        if (data === null) {
          this.toast.warning("Dữ liệu không có", "Thông báo")
        } else {
          this.childCategoryEdit = data;
          this.formEdit.patchValue(this.childCategoryEdit);
        }
      });
    });
  }

  compareFn(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.categoryId === c2.categoryId : c1 === c2;
  }

  save() {
    this.serviceAdminService.updateChildCategory(this.childCategoryEdit.childCategoryId, this.formEdit.getRawValue()).subscribe(data => {
      this.toast.success("Chuyên mục đã được chỉnh sửa");
      this.router.navigateByUrl('admin/categories/child-categories');
      if (this.childCategoryEdit.childCategoryId === null) {
        this.toast.warning("Chuyên mục này không có", "Thông báo")
      }
    })

  }
}
