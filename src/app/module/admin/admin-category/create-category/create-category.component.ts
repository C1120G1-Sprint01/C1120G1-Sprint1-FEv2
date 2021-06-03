import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  formCreate: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private serviceAdminService: ServiceAdminService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      categoryName: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ\s]*$/)]],
      category: [''],
    });
  }

  save() {
    console.log(this.formCreate.getRawValue());
    this.serviceAdminService.createCategory(this.formCreate.getRawValue()).subscribe(data => {
      this.toast.success('Chuyên mục đã cha đã được tạo');
      this.router.navigateByUrl('admin/categories/categories');
    });
  }
}
