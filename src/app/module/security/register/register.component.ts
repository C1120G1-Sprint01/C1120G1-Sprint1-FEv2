import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../model/User';
import {Ward} from '../../../model/Ward';
import {Province} from '../../../model/Province';
import {District} from '../../../model/District';
import {UserCustomerService} from '../../../service/service-customer/user-customer.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formAddNewCustomer: FormGroup;
  selectedImg: any = null;
  isMessage: any;
  listError: any = "";
  isMessage2: any;
  isMessage3: any;
  isMessage1: any;
  imgSrc: string = '../assets/img/avatar-1.png';
  public user: User[];
  public wards: Ward[];
  public provinces: Province[];
  public districts: District[];
  id: number = 0;
  loading = false;
  messageImageError: string = "";
  checkAccept : boolean =false;


  constructor(private userCustomerService: UserCustomerService,
              private router: Router,
              private storage: AngularFireStorage,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.userCustomerService.getAllProvince().subscribe(data => {
      this.provinces = data;
    });
    this.formAddNewCustomer = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^(\s*)([\p{Lu}]|[\p{Ll}]){2,}((\s*)(([\p{Lu}]|[\p{Ll}]){2,}))+(\s*)$/u),
        Validators.minLength(6), Validators.maxLength(45)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10,11}$')]],
      ward: ['', [Validators.required]],
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
        const filePath = `user/${this.selectedImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formRegister.img = url;
              this.userCustomerService.createUser(formRegister).subscribe(data => {
                this.router.navigateByUrl('');
                this.toastr.success("Them moi thanh cong", "Notification", {
                  timeOut: 1000,
                  progressBar: true,
                  progressAnimation: 'increasing'
                });
              }, error => {
                if (error.status === 400) {
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
      this.userCustomerService.createUser(formRegister).subscribe(data => {
        this.router.navigateByUrl('/');
        this.toastr.success("Them moi thanh cong", "Notification", {
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
  showPreview(image: any) {

    if (image.target.files && image.target.files[0]) {
      const file = image.target.files[0].name;
      const path = file.substring(file.length - 3).toLowerCase();
      const path1 = file.substring(file.length - 4).toLowerCase();
      if (path === 'png' || path === 'jpg' || path1 === 'jpeg') {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imgSrc = e.target.result;
        reader.readAsDataURL(image.target.files[0]);
        this.selectedImg = image.target.files[0];
        this.messageImageError = '';
      } else {
        this.imgSrc = null;
        this.messageImageError = '*Tệp ảnh bạn chọn không hợp lệ!';
        this.selectedImg = null;
      }
    } else {
      this.imgSrc = '../assets/img/avatar-1.png';
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

  onchangeProvince(provinceId) {
    if (provinceId) {
      this.userCustomerService.getAllDistrictByProvinceId(provinceId).subscribe(data => {
        this.districts = data;
        this.wards = null;
      })
    } else {
      this.districts = null;
      this.wards = null;
    }
  }

  onchangeDistrict(districtId) {
    if (districtId) {
      this.userCustomerService.getAllWardByDistrictId(districtId).subscribe(data => {
        this.wards = data;
      })
    } else {
      this.wards = null;
    }
  }

  removeImage() {
    this.imgSrc = null;
    this.selectedImg = null;
  }

  changeAccept() {
    this.checkAccept = true;
  }
}
