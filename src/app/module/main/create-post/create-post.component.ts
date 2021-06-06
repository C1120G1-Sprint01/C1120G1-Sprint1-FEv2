import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServiceCustomerService} from '../../../service/service-customer/service-customer.service';
import {Router} from '@angular/router';
import {AddressService} from '../../../service/service-customer/address.service';
import {CategoryService} from '../../../service/service-customer/category.service';
import {ToastrService} from 'ngx-toastr';
import {finalize} from "rxjs/operators";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {Province} from "../../../model/Province";
import {District} from "../../../model/District";
import {Ward} from "../../../model/Ward";
import {Category} from "../../../model/Category";
import {ChildCategory} from "../../../model/ChildCategory";
import {CommonUtilService} from "../../../service/common-util/common-util.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  form: FormGroup;
  provinces: Province[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  categories: Category[] = [];
  childCategories: ChildCategory[] = [];
  imagesSource: any[] = [];
  images: File[] = [];
  imageSet: any[] = [];
  username: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private serviceCustomer: ServiceCustomerService,
    private commonUtilService: CommonUtilService,
    private router: Router,
    private addressService: AddressService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService,
    private storage: AngularFireStorage,
  ) {
  }

  ngOnInit(): void {
    this.formInit();

    this.addressService.findAllProvince().subscribe(data => {
      this.provinces = data;
    });

    this.categoryService.findAllCategory().subscribe(data => {
      console.log(data);
      this.categories = data;
    }, error => {
      console.log("Error at findAllCategory(): " + error);
    });
  }

  formInit() {
    this.form = this.formBuilder.group({
      posterName: ["Hoang Tran", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      phone: ["0123456789", [Validators.required, Validators.pattern('^[\\d]{10,11}$')]],
      email: ["hoang@gmail.com", [Validators.required, Validators.pattern('^([a-zA-Z0-9]+-*_*.*)+\\@(gmail|yahoo)\\.com$')]],
      ward: ["", [Validators.required]],
      district: [""],
      province: [""],
      category: [""],
      childCategory: ["", [Validators.required]],
      postType: [true, [Validators.required]],
      title: ["Bán xe", [Validators.required]],
      description: ["Bán xe", [Validators.required]],
      price: [10000000, [Validators.pattern('^[\\d]+$')]],
      file: [""],
      imageSet: [""]
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let image = event.target.files[i];

        if (this.commonUtilService.validateImageFile(image)) {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            this.imagesSource.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[i]);
          this.images.push(image);
        }
      }
    }
  }

  removeImg(index: number) {
    this.images.splice(index, 1);
    this.imagesSource.splice(index, 1);
  }

  uploadImages(images: any[]): Promise<any> {
    return new Promise<any>((resolve) => {
      const imagesAmount = images.length;

      if (imagesAmount > 0) {
        for (let i = 0; i < imagesAmount; i++) {
          const image = images[i];
          const filePath = `test/${image.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
          const fileRef = this.storage.ref(filePath);

          this.storage.upload(filePath, image).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                console.log(url);
                this.imageSet.push({imageName: image.name, url: url});
                if (this.imageSet.length == imagesAmount) {
                  resolve(this.imageSet);
                }
              });
            })
          ).subscribe();
        }
      }
    });
  }

  submitForm(form: FormGroup) {
    this.username = this.tokenStorageService.getUser().username;
    this.uploadImages(this.images).then((resolve) => {
      console.log(resolve);
      this.form.patchValue({
        imageSet: resolve
      });
      this.serviceCustomer.savePost(form.value, this.username).subscribe(result => {
        this.router.navigateByUrl("/");
        this.toastr.success("Tin của bạn đang chờ được duyệt", "Đăng tin thành công!", {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }, error => {
        this.toastr.error("Đã có lỗi xảy ra!", "Lỗi!");
        console.log("error is: " + error);
      });
      this.imageSet = [];
      console.log(this.imageSet);
    });
  }

  cancelCreate() {
    this.router.navigateByUrl("/");
    this.toastr.warning("Huỷ đăng tin mới thành công!", "Hủy đăng tin mới!");
  }

  onChangeProvince() {
    this.addressService.findAllDistrictByProvinceId(this.form.controls['province'].value.provinceId).subscribe(data => {
      this.districts = data;
      console.log(data);
      this.form.controls['ward'].reset('');
      this.form.controls['district'].reset('');
    })
  }

  onChangeDistrict() {
    this.addressService.findAllWardByDistrictId(this.form.controls['district'].value.districtId).subscribe(data => {
      this.wards = data;
      this.form.controls['ward'].reset('');
      console.log(data);
    })
  }

  onChangeCategory() {
    this.categoryService.findAllChildCategoryByCategoryId(this.form.controls['category'].value.categoryId).subscribe(
      data => {
        console.log("Data : " + data);
        this.childCategories = data;
        this.form.value.childCategory = this.childCategories[0];
      }, error => {
        console.log("get " + error + " on onChangeCategory");
      })
  }

}
