import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Status} from '../../../model/Status';
import {Image} from '../../../model/Image';
import {User} from '../../../model/User';
import {ServiceCustomerService} from '../../../service/service-customer/service-customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddressService} from '../../../service/service-customer/address.service';
import {CategoryService} from '../../../service/service-customer/category.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  form: FormGroup;
  province;
  district;
  category;
  provinces;
  districts;
  wards;
  categories;
  childCategories;
  status: Status;
  imageSet: Image[] = [];
  user: User;

  i: number = 1;
  id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private serviceCustomer: ServiceCustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private addressService: AddressService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    console.log("constructor");
  }

  ngOnInit(): void {
    console.log("init");
    this.formInit();

    this.addressService.findAllProvince().subscribe(data => {
      this.provinces = data;
    });

    this.categoryService.findAllCategory().subscribe(data => {
      console.log('Data' + data);
      this.categories = data;
    }, error => {
      console.log('Error at findAllCategory(): ' + error);
    });

    this.addressService.findAllDistrictByProvinceId(this.province.provinceId).subscribe(data => {
      this.districts = data;
    });

    this.addressService.findAllWardByDistrictId(this.district.districtId).subscribe(data => {
      this.wards = data;
    });

    this.categoryService.findAllChildCategoryByCategoryId(this.category.categoryId).subscribe(data => {
      this.childCategories = data;
    });
  }

  formInit() {
    this.form = this.formBuilder.group({
      postId: [''],
      posterName: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(45)]],
      phone: ["", [Validators.required, Validators.pattern('^0[\\d]{9,10}$')]],
      email: ["", [Validators.required,
        Validators.pattern('^([a-zA-Z0-9]+-*_*.*)+\\@(gmail|yahoo)\\.com$'),
        Validators.maxLength(253)
      ]],
      ward: ["", [Validators.required]],
      district: [""],
      province: [""],
      category: [""],
      childCategory: ["", [Validators.required]],
      postType: [true, [Validators.required]],
      title: ["", [Validators.required, Validators.maxLength(80)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      postDateTime: [""],
      price: ["", [Validators.pattern('^[\\d]+$'), Validators.maxLength(12)]],
      enabled: [true],
      status: [this.status],
      user: [this.user],
      imageSet: [this.imageSet]
    });
  }

  submitForm(form: FormGroup) {
    // console.log('Value : abc');
    // this.serviceCustomer.savePost(form.value).subscribe(data => {
    //   this.router.navigateByUrl('/');
    //   this.toastr.success('Đăng tin thành công!', 'Thành công!');
    // }, error => {
    //   this.toastr.error('Đã có lỗi xảy ra!', 'Lỗi!');
    //   console.log('Error : ' + error);
    // });
  }

  onChangeProvince() {
    this.addressService.findAllDistrictByProvinceId(this.province.provinceId).subscribe(data => {
      this.districts = data;
      this.addressService.findAllWardByDistrictId(this.districts[0].districtId).subscribe(data => {
        this.wards = data;
        // set data to form => binding ward to form when change province
        this.form.value.ward = this.wards[0];
      });
    });
  }

  onChangeDistrict() {
    this.addressService.findAllWardByDistrictId(this.district.districtId).subscribe(data => {
      this.wards = data;
    });
  }

  onChangeCategory() {
    this.categoryService.findAllChildCategoryByCategoryId(this.category.categoryId).subscribe(data => {
      console.log('Data : ' + data);
      this.childCategories = data;
      this.form.value.childCategory = this.childCategories[0];
    }, error => {
      console.log('get ' + error + ' on onChangeCategory');
    });
  }

  addImage() {
    if (this.i <= 4) {
      this.id = 'addImg' + this.i;
      document.getElementById(this.id).style.display = 'block';
      this.i++;
    }
    console.log('I add : ' + this.i);
  }

  removeImg(idImg: string) {
    this.i--;
    document.getElementById(idImg).style.display = 'none';
    console.log('I remove : ' + this.i);
  }

  cancelUpdate() {
    this.router.navigateByUrl("/");
    this.toastr.warning("Huỷ đăng tin mới thành công!", "Hủy đăng tin mới!");
  }
}
