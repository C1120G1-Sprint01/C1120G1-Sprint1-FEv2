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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formAddNewCustomer: FormGroup;

  selectedImg: any = null;
  isMessage: any;
  listError: any;
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
  private isCheck = false;
  selectedImage: any = null;


  constructor(private userService: UserCustomerService,
              private router: Router,
              private storage: AngularFireStorage,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.userService.getAllProvince().subscribe(data => {
      this.provinces = data;
      console.log(data);
    });
    this.userService.getAllDistrictByProvinceId(this.id).subscribe(data => {
      this.districts = data;
      console.log(data);
    });
    this.userService.getAllWardtByDistrictId(this.id).subscribe(data => {
      this.wards = data;
      console.log(data);
    });
    this.formAddNewCustomer = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[^\\d`~!@#$%^&*()_\\-+=|\\{}\\[\\]:;"\'<>,.?\/]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10,11}$')]],
      ward: ['', [Validators.required]],
      province: ['', [Validators.required]],
      district: ['', [Validators.required]],
      account: ['', [Validators.required, Validators.pattern('^[^\\d`~!@#$%^&*()_\\-+=|\\{}\\[\\]:;"\'<>,.?\/]+$')]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      confirmPassword: ['', [Validators.required]],
      avatarUrl: ['']
    });
  }

  // Register
  addNewCustomer(formValue) {
    this.isCheck = false;
    this.isMessage = false;
    this.loading = true;
    if (this.formAddNewCustomer.valid) {
      const filePath = `user/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue.img = url;
            this.userService.createUser(formValue).subscribe(data => {
              this.router.navigateByUrl('');
              setTimeout(() => {
                alert('Them moi ok');
              }, 400);
            }, error => {
              alert('nhap sai');
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
        })).subscribe();
    } else {
      this.userService.createUser(formValue).subscribe(data => {
      }, error => {
        alert('nhap sai');
        if (error.status === 400) {
          console.log(error.error);
          this.listError = error.error;
        }
      }, () => {
        this.loading = false;
      });
    }
  }

  onReset() {
    this.formAddNewCustomer.reset();
  }

  // upload anh fire base
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = 'src/assets/img/avatar-2.png';
      this.selectedImage = null;
    }
  }

}
