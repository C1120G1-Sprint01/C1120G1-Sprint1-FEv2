import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status} from "../../../model/Status";
import {Image} from "../../../model/Image";
import {User} from "../../../model/User";
import {ServiceCustomerService} from 'src/app/service/service-customer/service-customer.service';
import {ActivatedRoute, Router} from "@angular/router";
import {AddressService} from "../../../service/service-customer/address.service";
import {CategoryService} from "../../../service/service-customer/category.service";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {AngularFireStorage} from "@angular/fire/storage";

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
  loading = false;
  imgSet: any[] = [];

  i: number = 1;
  id: string = '';

  username: string = '';
  private selectedImage: any = null;
  private imgSrc: any;

  constructor(
    private formBuilder: FormBuilder,
    private serviceCustomer: ServiceCustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
      console.log("Data" + data)
      this.categories = data;
    }, error => {
      console.log("Error at findAllCategory(): " + error)
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
      postId: [""],
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
      title: ["", [Validators.required, Validators.maxLength(256)]],
      description: ["", [Validators.required, Validators.maxLength(1000)]],
      postDateTime: [""],
      price: ["", [Validators.pattern('^[\\d]+$'), Validators.maxLength(12)]],
      enabled: [true],
      status: [this.status],
      user: [this.user],
      imageSet: [""],
      // imageSet: this.formBuilder.group({
      //   img1: [""],
      //   img2: [""],
      //   img3: [""],
      //   img4: [""]
      // })
    });
  }

  submitForm(form: FormGroup) {
    console.log(this.form.value);
    this.username = this.tokenStorageService.getUser().username;
    this.serviceCustomer.savePost(this.username, form.value).subscribe(data => {
      this.router.navigateByUrl("");
      this.toastr.success("Tin của bạn đang chờ được duyệt", "Đăng tin thành công!");
    }, error => {
      this.toastr.error("Đã có lỗi xảy ra!", "Lỗi!");
      console.log("Error : " + error);
    })
  }

  // submitForm(formPost) {
  //   if (this.form.valid) {
  //     const filePath = `test/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe((url) => {
  //           console.log("URL with https: " + url);
  //           console.log(this.form);
  //           // formPost.img = url.substr(8);
  //           // console.log("URL with no https: " + formPost.img);
  //           // this.username = this.tokenStorageService.getUser().username;
  //           // this.serviceCustomer.savePost(this.username, formPost.img, formPost.value).subscribe(data => {
  //           //   this.router.navigateByUrl("");
  //           //   this.toastr.success("Tin của bạn đang chờ được duyệt", "Đăng tin thành công!", {
  //           //     timeOut: 1000,
  //           //     progressBar: true,
  //           //     progressAnimation: 'increasing'
  //           //   });
  //           // }, error => {
  //           //   console.log("error is: " + error);
  //           // }, () => {
  //           //   this.loading = false;
  //           // });
  //         });
  //       })).subscribe()
  //   } else {
  //     // this.username = this.tokenStorageService.getUser().username;
  //     // this.serviceCustomer.savePost(this.username, url,formPost.value).subscribe(data => {
  //     //   this.router.navigateByUrl("");
  //     //   this.toastr.success("Tin của bạn đang chờ được duyệt", "Đăng tin thành công!", {
  //     //     timeOut: 1000,
  //     //     progressBar: true,
  //     //     progressAnimation: 'increasing'
  //     //   })
  //     // }, error => {
  //     //   console.log(error);
  //     // }, () => {
  //     //   this.loading = false;
  //     // });
  //   }
  // }

  showPreview(event: any, imgControl: number) {
    let files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      // reader.onload = (e: any) => this.imgSrc = e.target.result;
      for (let i = 0; i < files.length; i++) {
        // reader.readAsDataURL(files[i]);
        this.imgSet[i] = event.target.files[i];
        console.log(this.imgSet);
      }
    }
    // else {
    //   this.imgSrc = 'src/assets/img/c1120g1-post-img.png';
    //   this.selectedImage = null;
    // }
  }

  // showPreview(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => this.imgSrc = e.target.result;
  //     reader.readAsDataURL(event.target.files[0]);
  //     this.selectedImage = event.target.files[0];
  //   } else {
  //     this.imgSrc = 'src/assets/img/c1120g1-post-img.png';
  //     this.selectedImage = null;
  //   }
  // }

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

  addImage() {
    if (this.i <= 4) {
      this.id = "addImg" + this.i;
      document.getElementById(this.id).style.display = 'block';
      this.i++;
    }
    console.log("I add : " + this.i)
  }

  removeImg(idImg: string) {
    this.i--;
    document.getElementById(idImg).style.display = 'none';
    console.log("I remove : " + this.i)
  }

  cancelUpdate() {
    this.router.navigateByUrl("");
    this.toastr.warning("Huỷ đăng tin mới thành công!", "Hủy đăng tin mới!");
  }
}
