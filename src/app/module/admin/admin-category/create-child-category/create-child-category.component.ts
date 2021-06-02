import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-child-category',
  templateUrl: './create-child-category.component.html',
  styleUrls: ['./create-child-category.component.css']
})
export class CreateChildCategoryComponent implements OnInit {
  formCreate: FormGroup;
  categoryList = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private serviceAdminService: ServiceAdminService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.serviceAdminService.getAllCategory().subscribe(data => {
      this.categoryList = data;
      console.log(data);
    });

    this.formCreate = this.fb.group({
      childCategoryName: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ\s]*$/)]],
      // nơi chưa đối tương category cha
      category: [''],
    });
  }

  save() {
    console.log(this.formCreate.getRawValue());
    //Khi a submit thì form sẽ được đưa xuống gồm name và thằng cha
    this.serviceAdminService.createChildCategory(this.formCreate.getRawValue()).subscribe(data => {
      this.toast.success('Chuyên mục đã được tạo');
      this.router.navigateByUrl('main-category/child-category');
    });
  }
}
