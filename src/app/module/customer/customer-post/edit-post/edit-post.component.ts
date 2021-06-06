import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceCustomerService } from '../../../../service/service-customer/service-customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../../../service/service-customer/address.service';
import { CategoryService } from '../../../../service/service-customer/category.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  refPost: FormGroup;
  id: number;
  province;
  district;
  category;

  provinces;
  districts;
  wards;
  categories;
  childCategories;
  status = [
    {
      "statusId": 2,
      "statusName": "Đợi duyệt"
    },
    {
      "statusId": 4,
      "statusName": "Thành công"
    },
    {
      "statusId": 5,
      "statusName": "Thất bại"
    }
  ];
  imageList;

  fileImage: any;
  urlImage: Array<string>;
  message: string;

  constructor(private _formBuilder: FormBuilder,
    private _serviceCustomer: ServiceCustomerService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _addressService: AddressService,
    private _categoryService: CategoryService,
    private _toastr: ToastrService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.fileImage = [];
    this.urlImage = [];

    this.formInit();

    this._addressService.findAllProvince().subscribe(data => {
      this.provinces = data;
    });

    this._categoryService.findAllCategory().subscribe(data => {
      this.categories = data;
    })

    this.id = this._activatedRoute.snapshot.params["id"];
    this._serviceCustomer.findPostById(this.id).subscribe(oldData => {
      // binding to form
      this.province = oldData.ward.district.province;
      this.district = oldData.ward.district;
      this.category = oldData.childCategory.category;
      this.imageList = oldData.imageSet;

      // set default status when update post
      if (oldData.status.statusId === 1 || oldData.status.statusId === 3 || oldData.status.statusId === 6) {
        oldData.status = this.status[0];
      }

      this.refPost.patchValue(oldData);

      this._addressService.findAllDistrictByProvinceId(this.province.provinceId).subscribe(data => {
        this.districts = data;
      });

      this._addressService.findAllWardByDistrictId(this.district.districtId).subscribe(data => {
        this.wards = data;
      });

      this._categoryService.findAllChildCategoryByCategoryId(this.category.categoryId).subscribe(data => {
        this.childCategories = data;
      });
    })

  }

  formInit() {
    this.refPost = this._formBuilder.group({
      postId: [""],
      posterName: ["", [Validators.required, Validators.pattern("^[a-zA-Z ]+$"), Validators.maxLength(50)]],
      phone: ["", [Validators.required, Validators.pattern("^[\\d]{10,11}$")]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(50)]],
      title: ["", [Validators.required, Validators.maxLength(50)]],
      postType: ["", [Validators.required]],
      postDateTime: [""],
      enabled: [""],
      price: ["", [Validators.required, Validators.min(0), Validators.max(2000000000)]],
      description: ["", [Validators.required]],
      status: ["", [Validators.required]],
      childCategory: ["", [Validators.required]],
      ward: ["", [Validators.required]],
      user: [""],
      imageSet: [""]
    });
  }

  // submitForm() {
  //   if (this.refPost.valid) {
  //     this._serviceCustomer.updatePost(this.refPost.value).subscribe(data => {
  //       this._router.navigateByUrl("/customer/posts");
  //       this._toastr.success("Chỉnh sửa bài đăng thành công!", "Thành công!");
  //     }, error => {
  //       this._toastr.error("Đã có lỗi xảy ra!", "Lỗi!");
  //     })
  //   }
  // }

  async submitForm() {
    await this.addImageToFireBase();
    console.log("save firebase");
    let postDTO = {
      post: this.refPost.value,
      images: this.urlImage
    };
    console.log("dto", postDTO);
    if (this.refPost.valid) {
      this._serviceCustomer.updatePost(postDTO).subscribe(data => {
        this._router.navigateByUrl("/customer/posts");
        this._toastr.success("Chỉnh sửa bài đăng thành công!", "Thành công!");
      }, error => {
        this._toastr.error("Đã có lỗi xảy ra!", "Lỗi!");
      })
    }
  }

  importImages(event) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        const name = file.type;
        const size = file.size;
        if (name.match(/(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
          if (size <= 1000000) {
            this.message = null;
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.fileImage.push({ url: e.target.result, file: file })
            };
            reader.readAsDataURL(file);
          } else {
            return this.message = "Big size!!"
          }
        } else {
          return this.message = 'Not Image!!';
        }
      }
    }
  }

  addImageToFireBase() {
    this.urlImage = [];
    return new Promise(resolve => {
      Promise.all(this.fileImage.map(file =>
        new Promise((resolve) => {
          const name = file.file.name;
          if (name.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
            const fileRef = this.storage.ref(name);
            this.storage.upload(name, file.file).snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL()
                  .subscribe((url) => {
                    this.urlImage.push(url);
                    resolve(1);
                  });
              })).subscribe();
          }
        }))).then(() => {
          resolve(1)
        });
    });
  }

  cancelUpdate() {
    this._router.navigateByUrl("/customer/posts");
    this._toastr.warning("Hủy chỉnh sửa bài đăng!", "Hủy!");
  }

  onChangeProvince() {
    this._addressService.findAllDistrictByProvinceId(this.province.provinceId).subscribe(data => {
      this.districts = data;
      this._addressService.findAllWardByDistrictId(this.districts[0].districtId).subscribe(data => {
        this.wards = data;
        // set data to refPost => binding ward to form when change province
        this.refPost.value.ward = this.wards[0];
      })
    })
  }

  onChangeDistrict() {
    this._addressService.findAllWardByDistrictId(this.district.districtId).subscribe(data => {
      this.wards = data;
    })
  }

  onChangeCategory() {
    this._categoryService.findAllChildCategoryByCategoryId(this.category.categoryId).subscribe(data => {
      this.childCategories = data;
      this.refPost.value.childCategory = this.childCategories[0];
    })
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  openImage(url: string) {
    window.open(url, "_blank");
  }

  compareProvinces(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.provinceId === o2.provinceId : o1 === o2;
  }

  compareDistricts(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.districtId === o2.districtId : o1 === o2;
  }

  compareWards(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.wardId === o2.wardId : o1 === o2;
  }

  compareStatus(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.statusId === o2.statusId : o1 === o2;
  }

  compareCategories(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.categoryId === o2.categoryId : o1 === o2;
  }

  compareChildCategories(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.childCategoryId === o2.childCategoryId : o1 === o2;
  }

}
