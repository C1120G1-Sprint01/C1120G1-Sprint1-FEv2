import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../model/User";
import {Ward} from "../../../../model/Ward";
import {Province} from "../../../../model/Province";
import {District} from "../../../../model/District";
import {ServiceAdminService} from "../../../../service/service-admin/service-admin.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  formAddNewCustomer: FormGroup;
  selectedImg: any = null;
  isMessage: any;
  listError: any = "";
  isMessage2: any;
  isMessage3: any;
  isMessage1: any;
  imgSrc: any;
  public user: User[];
  public wards: Ward[];
  public provinces: Province[];
  public districts: District[];
  id: number = 0;
  loading = false;
  constructor(private serviceAdmin: ServiceAdminService,
              private router: Router,
              private storage: AngularFireStorage,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.serviceAdmin.getAllProvince().subscribe(data => {
      this.provinces = data;
      console.log(data);
    })

    this.formAddNewCustomer = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[^\\d`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;"\'<>,.?\/]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("(^(090)\\d{7}$)|(^(091)\\d{7}$)|(^(\\+\\(84\\) 90)\\d{7}$)|(^(\\+\\(84\\) 91)\\d{7}$)")]],
      ward: ['', [Validators.required]],
      registerDate: [''],
      province: ['', [Validators.required]],
      district: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
      confirmPassword: ['', [Validators.required]],
      avatarUrl: ['']
    })
  }

  // create new user
  addNewCustomer(formRegister) {
    this.isMessage = false;
    this.loading = true;
    this.isMessage1 = false;
    this.isMessage2 = false;
    this.isMessage3 = false;
    if (this.formAddNewCustomer.valid) {
      if (this.formAddNewCustomer.value.password === this.formAddNewCustomer.value.confirmPassword) {
        const  filePath = `user/${this.selectedImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formRegister.img = url;
              console.log(url);
              console.log(this.formAddNewCustomer);
              this.serviceAdmin.createUser(formRegister).subscribe(data => {
                this.router.navigateByUrl('/admin/users');
                this.toastr.success("Them moi thanh cong", "Thong bao", {
                  timeOut: 1000,
                  progressBar: true,
                  progressAnimation: 'increasing'
                });
              }, error => {
                if (error.status === 400) {
                  console.log(error.error);
                  this.listError = error.error;
                } else if (error.status === 404) {
                  this.isMessage = true;
                }
              }, () => {
                this.loading = false;
              });
            });
          })).subscribe()
      } else {
        this.isMessage = true;
      }
    } else {
      this.serviceAdmin.createUser(formRegister).subscribe(data => {
        this.router.navigateByUrl('/admin/users');
        this.toastr.success("Them moi thanh cong", "Thong Bao", {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing'
        })
      }, error => {
        if (error.status === 400) {
          console.log(error.error);
          this.listError = error.error;
        } else if (error.status === 404) {
          this.isMessage = true;
        }
      }, () => {
        this.loading = false;
      });
    }
  }

  //    upload anh fire base
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      this.imgSrc = 'src/assets/img/avatar-2.png';
      this.selectedImg = null;
    }
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

  onchangeProvince(event) {
    let userProfile = this.formAddNewCustomer.controls['province'].value;
    const provinceId = userProfile.provinceId;
    if (provinceId) {
      this.serviceAdmin.getAllDistrictByProvinceId(provinceId).subscribe(data => {
        this.districts = data;
        console.log(data);
        this.wards = null;
      })
    } else {
      this.districts = null;
      this.wards = null;
    }
  }

  onchangeDistrict(event) {
    let userInfo = this.formAddNewCustomer.controls['district'].value;
    const districtId = userInfo.districtId
    if (districtId) {
      this.serviceAdmin.getAllWardByDistrictId(districtId).subscribe(data => {
        this.wards = data;
        console.log(data);
      })
    } else {
      this.wards = null;
    }
  }

  close() {
    this.router.navigateByUrl('/admin/users');
  }

}
