import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../model/User';
import {Account} from '../../../../model/Account';
import {Ward} from '../../../../model/Ward';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Province} from "../../../../model/Province";
import {District} from "../../../../model/District";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {MainLoadingComponent} from "../../../main/main-layout/main-loading/main-loading.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  rfEditForm: FormGroup;
  public users: User;
  public accounts: Account[];
  public wards: Ward[];
  public provinces: Province[]
  public districts: District[];
  id: number = 0;
  selectedImg: any;
  public imgSrc: string = '../../../../assets/img/avatar-1.png';
  listError: any = "";
  isCheck;


  constructor(private serviceAdminService: ServiceAdminService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private storage: AngularFireStorage,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.selectedImg = null;
    this.serviceAdminService.getAllProvince().subscribe(dataProvince => {
      this.provinces = dataProvince;
    });
    this.id = this.activatedRoute.snapshot.params['id'];
    this.serviceAdminService.getUserById(this.id).subscribe(data => {
      // console.log('Data ' + JSON.stringify(data));
      this.imgSrc = data.avatarUrl;
      // this.rfEditForm.patchValue(data);
      this.serviceAdminService.getAllDistrictByProvinceId(data.ward.district.province.provinceId).subscribe(dataDistr => {
        this.districts = dataDistr;
      });
      this.serviceAdminService.getAllWardByDistrictId(data.ward.district.districtId).subscribe(dataWard => {
        this.wards = dataWard;
      });
      this.users = data;
      console.log(data.ward);
      console.log(data.ward.district);
      console.log(data.ward.district.province);
      this.rfEditForm.patchValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
        district: data.ward.district,
        province: data.ward.district.province,
        ward: data.ward,
        // avatarUrl: data.avatarUrl
      })

    })
    this.rfEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[^\\d`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;"\'<>,.?\/]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^(09)[\\d]{8}$")]],
      ward: ['', [Validators.required]],
      district: ['', [Validators.required]],
      province: ['', [Validators.required]],
      avatarUrl: ['']
    })

  }

  // Ngoc - submit
  onSubmit() {
    // console.log(this.rfEditForm.value);
    // this.users = this.rfEditForm.value;
    // console.log(this.users);
    // this.serviceAdminService.editUser(this.rfEditForm.value, this.id).subscribe(data => {
    //   this.users = data;
    //   this.router.navigateByUrl('/admin/users');
    //   this.toastr.info("Chỉnh sửa thông tin thành công ! !", "Thông báo ! ", {
    //     timeOut: 1000,
    //     progressBar: true,
    //     progressAnimation: 'increasing'
    //   });
    // })
    this.createFireBase();

  }
  createFireBase() {
    if (this.rfEditForm.valid) {
      if (this.users.avatarUrl !== this.imgSrc) {
        const filePath = `imgChange/${this.selectedImg.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.openLoading();
        this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(avatarUrl => {
              this.rfEditForm.value.avatarUrl = avatarUrl;
              console.log(avatarUrl);
              this.serviceAdminService.editUser(this.rfEditForm.value, this.id).subscribe(() => {
                this.dialog.closeAll();
                this.router.navigateByUrl('/admin/users');
                  this.toastr.info("Chỉnh sửa thông tin thành công ! !", "Thông báo ! ", {
                    timeOut: 5000,
                    progressBar: true,
                    progressAnimation: 'increasing'
                  });
              }, error => {
                this.listError = error.error;
              });
            })
          })
        ).subscribe();
      } else {
        this.rfEditForm.value.avatarUrl = this.imgSrc;
        console.log(this.imgSrc);
        this.serviceAdminService.editUser(this.rfEditForm.value, this.id).subscribe(() => {
          this.router.navigateByUrl('/admin/users');
            this.toastr.info("Chỉnh sửa thông tin thành công ! !", "Thông báo ! ", {
              timeOut: 5000,
              progressBar: true,
              progressAnimation: 'increasing'
            });
        }, error => {
          this.listError = error.error;
        });
      }
    } else {
      this.toastr.warning("Dữ liệu chỉnh sửa chưa hợp lệ, mời bạn nhập lại !", "Lỗi !");
    }
  }

  openLoading() {
    const dialogRef = this.dialog.open(MainLoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
  }


  backToUserList() {
    this.router.navigate(['admin/users']);
  }


  compareProvince(province1: Province, province2: Province): boolean {
    return province1 && province2 ? province1.provinceId === province2.provinceId : province1 === province2
  }

  compareDistrict(district1: District, district2: District): boolean {
    return district1 && district2 ? district1.districtId === district2.districtId : district1 === district2
  }

  compareWard(ward1: Ward, ward2: Ward): boolean {
    return ward1 && ward2 ? ward1.wardId === ward2.wardId : ward1 === ward2
  }



  onChangeProvince(event) {
    let userProfile = this.rfEditForm.controls['province'].value;
    const provinceId = userProfile.provinceId;
    if (provinceId) {
      this.serviceAdminService.getAllDistrictByProvinceId(provinceId).subscribe(data => {
        this.districts = data;
        console.log(data);
        this.wards = null;
      })
    } else {
      this.districts = null;
      this.wards = null;
    }
  }

  onChangeDistrict(event) {
    let userInfo = this.rfEditForm.controls['district'].value;
    const districtId = userInfo.districtId;
    if (districtId) {
      this.serviceAdminService.getAllWardByDistrictId(districtId).subscribe(data => {
        this.wards = data;
        console.log(data);
      })
    } else {
      this.wards = null;
    }
  }


  // Xem truoc hinh anh
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImg = event.target.files[0];
      let formData = new FormData();
      formData.append("file", this.selectedImg);
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      this.imgSrc = '../../../../assets/img/avatar-1.png';
      this.selectedImg = null;
    }
  }
  checkInput(item) {
    this.isCheck = false;
    if (this.listError !== "") {
      switch (item) {
        case "phone":
          this.listError.phone = "";
          this.listError.existPhone = "";
          this.isCheck = true;
          break;
        case "email":
          this.listError.email = "";
          this.listError.existEmail = "";
          this.isCheck = true;
          break;
      }
    }
  }
}
