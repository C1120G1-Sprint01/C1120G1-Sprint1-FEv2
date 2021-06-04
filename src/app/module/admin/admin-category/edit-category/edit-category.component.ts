import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {Category} from '../../../../model/Category';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  formEdit: FormGroup;
  categoryEdit: Category;

  constructor(private fb: FormBuilder,
              private router: Router,
              private serviceAdminService: ServiceAdminService,
              private active: ActivatedRoute,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    let id = this.active.snapshot.params['id'];
    this.formEdit = this.fb.group({
      categoryId: [''],
      categoryName: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ\s]*$/)]],
    });

    this.serviceAdminService.getCategoryById(id).subscribe((data: Category) => {
      this.categoryEdit = data;
      this.formEdit.patchValue(this.categoryEdit);
    });

  }

  save() {
    this.serviceAdminService.updateCategory(this.categoryEdit.categoryId,this.formEdit.getRawValue()).subscribe(data => {
      this.toast.success("Chuyên mục cha đã được chỉnh sửa");
      this.router.navigateByUrl('admin/categories/categories');
      if (data === null) {
        this.toast.warning("Chuyên mục này không có","Thông báo")
      }
    })
  }
}
