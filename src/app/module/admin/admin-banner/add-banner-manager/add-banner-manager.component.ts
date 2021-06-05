import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ServiceBannerService} from '../../../../service/service-banner/service-banner.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {LoadingComponent} from '../loading/loading.component';
import {Size} from "../../../../model/Size";
import {Position} from "../../../../model/Position";
import {Banner} from "../../../../model/Banner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-banner-manager',
  templateUrl: './add-banner-manager.component.html',
  styleUrls: ['./add-banner-manager.component.css']
})
export class AddBannerManagerComponent implements OnInit {
  constructor(private bannerManagementService: ServiceBannerService,
              private dialog: MatDialog,
              private toastr: ToastrService,
              private storage: AngularFireStorage) {
  }

  public messageImageError: string;
  public imageBanner = null;
  public selectedImage: any = null;
  public listPosition: Position[];
  public listSize: Size[];
  public banner: Banner;
  public dayTime;
  public formCreateBanner: FormGroup;
  public listBannerTop: number;
  public listBannerBot: number;
  public listBannerLeftOne: number;
  public listBannerLeftTwo: number;
  public listBannerLeftThree: number;
  public listBannerRightOne: number;
  public listBannerRightTwo: number;
  public listBannerRightThree: number;
  public positionChoose: number;
  public sizeAuto: number;

  ngOnInit(): void {
    this.bannerManagementService.showAllAdvertiseBannerByPosition(1).subscribe((data) => {
      this.listBannerTop = data.length;
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(2).subscribe((data) => {
      this.listBannerBot = data.length;
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(3).subscribe((data) => {
      this.listBannerRightOne = data.length;
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(4).subscribe((data) => {
      this.listBannerRightTwo = data.length;
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(5).subscribe((data) => {
      this.listBannerRightThree = data.length;
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(6).subscribe((data) => {
      this.listBannerLeftOne = data.length;
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(7).subscribe((data) => {
      this.listBannerLeftTwo = data.length;
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(8).subscribe((data) => {
      this.listBannerLeftThree = data.length;
    });
    this.bannerManagementService.showAllPosition().subscribe((data) => {
      this.listPosition = data;
    });
    this.bannerManagementService.showAllSize().subscribe((data) => {
      this.listSize = data;
    });
    this.formCreateBanner = new FormGroup(
      {
        bannerId: new FormControl(null),
        duration: new FormControl('', [Validators.required]),
        image: new FormControl(''),
        positionId: new FormControl('', [Validators.required]),
        sizeId: new FormControl('')
      }
    );
  }


  createBanner() {
    switch (this.formCreateBanner.value.duration) {
      case '1':
        this.dayTime = 7;
        break;
      case '2':
        this.dayTime = 14;
        break;
      case '3':
        this.dayTime = 30;
        break;
      case '4':
        this.dayTime = 60;
        break;
      case '5':
        this.dayTime = 180;
        break;
      default:
    }
    if (this.formCreateBanner.valid && this.imageBanner !== null && this.checkPositionBanner(this.formCreateBanner.value.positionId) === true) {
      const milliseconds = new Date().getTime() + this.dayTime * 60 * 60 * 24 * 1000;
      this.formCreateBanner.value.duration = new Date(milliseconds);
      this.formCreateBanner.value.sizeId = this.sizeAuto;
      const name = this.selectedImage.name;
      const stringImage = name.substring(name.length - 3).toLowerCase();
      if (stringImage === 'png' || stringImage === 'jpg') {
        const fileName = 'imageBanner/' + name;
        const fileRef = this.storage.ref(fileName);
        this.openLoading();
        this.storage.upload(fileName, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
                this.formCreateBanner.value.image = url;
                this.bannerManagementService.addAdvertiseBanner(this.formCreateBanner.value).subscribe((data) => {
                  this.dialog.closeAll();
                  this.toastr.success('Thêm Mới Banner Thành Công', 'Thông Báo!', {
                    timeOut: 3000,
                    progressAnimation: 'decreasing'
                  });
                });
              }
            );
          })).subscribe();
      }
    }
    if (this.checkPositionBanner(this.formCreateBanner.value.positionId) === false && this.formCreateBanner.valid && this.imageBanner !== null) {
      this.toastr.warning('Hiện tại vị trí này đã có 1 banner khác hãy quay lại sau', 'Thông Báo!', {
        timeOut: 3000,
        progressAnimation: 'decreasing'
      });
    }
    if (this.imageBanner === null) {
      this.messageImageError = '*Không được bỏ trống ảnh';
    }
  }

  openLoading() {
    const dialogRef = this.dialog.open(LoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
  }

  closeAddFormBanner() {
    this.dialog.closeAll();
  }

  showImage(image) {
    if (image.target.files && image.target.files[0]) {
      const file = image.target.files[0].name;
      const path = file.substring(file.length - 3).toLowerCase();
      if (path === 'png' || path === 'jpg') {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imageBanner = e.target.result;
        reader.readAsDataURL(image.target.files[0]);
        this.selectedImage = image.target.files[0];
        this.messageImageError = '';
      } else {
        this.imageBanner = null;
        this.messageImageError = '*Tệp ảnh bạn chọn không hợp lệ!';
        this.selectedImage = null;
      }
    } else {
      this.selectedImage = null;
      this.messageImageError = '*Không được bỏ trống ảnh';
    }
  }

  removeImage() {
    this.imageBanner = null;
    this.selectedImage = null;
  }

  checkPositionBanner(positionId: number) {
    switch (positionId) {
      case 1:
        return this.listBannerTop < 13;
      case 2:
        return this.listBannerBot === 0;
      case 3:
        return this.listBannerRightOne === 0;
      case 4:
        return this.listBannerRightTwo === 0;
      case 5:
        return this.listBannerRightThree === 0;
      case 6:
        return this.listBannerLeftOne === 0;
      case 7:
        return this.listBannerLeftTwo === 0;
      case 8:
        return this.listBannerLeftThree === 0;
      default:
    }
  }
  chooseSize(positionId: number) {
    switch (positionId) {
      case 1:
      case 2:
        this.sizeAuto = 2;
        break;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        this.sizeAuto = 1;
        break;
      default:
    }
  }

  get duration() {
    return this.formCreateBanner.get('duration');
  }

  get position() {
    return this.formCreateBanner.get('positionId');
  }

  get image() {
    return this.formCreateBanner.get('image');
  }


}
