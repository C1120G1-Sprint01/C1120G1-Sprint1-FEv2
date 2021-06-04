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
  public selectedImg: any;
  public imgSrc: string = '../../../../assets/img/avatar-1.png';

  constructor(private serviceAdminService: ServiceAdminService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.serviceAdminService.getAllProvince().subscribe(dataProvince => {
      this.provinces = dataProvince;
      console.log(dataProvince);
    })
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log('id edit ' + this.id);
    this.serviceAdminService.getUserById(this.id).subscribe(data => {
      console.log('Data ' + JSON.stringify(data));
      this.rfEditForm.patchValue(data);
      this.serviceAdminService.getAllDistrictByProvinceId(data.ward.district.province.provinceId).subscribe(dataDistr => {
        this.districts = dataDistr;
      })
      this.serviceAdminService.getAllWardByDistrictId(data.ward.district.districtId).subscribe(dataWard => {
        this.wards = dataWard;
      })
      this.users = data;

      this.rfEditForm.patchValue({
        district: data.ward.district,
        province: data.ward.district.province,
        avatarUrl: data.avatarUrl
      })

      console.log(this.rfEditForm.value);
    })
    this.rfEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[^\\d`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;"\'<>,.?\/]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("(^(090)\\d{7}$)|(^(091)\\d{7}$)|(^(\\+\\(84\\) 90)\\d{7}$)|(^(\\+\\(84\\) 91)\\d{7}$)")]],
      ward: ['', [Validators.required]],
      district: [''],
      province: [''],
      avatarUrl: ['']
    })

  }

  // Ngoc - submit
  onSubmit() {
    console.log(this.rfEditForm.value);
    this.users = this.rfEditForm.value;
    console.log(this.users);
    this.serviceAdminService.editUser(this.rfEditForm.value, this.id).subscribe(data => {
      this.users = data;
      this.router.navigateByUrl('/admin/users');
      this.toastr.info("Chinh sua thong tin thanh cong !", "Thong ", {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing'
      });
    })
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
    const districtId = userInfo.districtId
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
}
