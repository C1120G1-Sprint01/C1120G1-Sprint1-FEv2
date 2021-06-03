import {Component, Inject, OnInit} from '@angular/core';
import {ServiceBannerService} from '../../../../service/service-banner/service-banner.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {LoadingComponent} from '../loading/loading.component';
import {Size} from "../../../../model/Size";
import {Banner} from "../../../../model/Banner";
import {Position} from "../../../../model/Position";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-banner-manager',
  templateUrl: './edit-banner-manager.component.html',
  styleUrls: ['./edit-banner-manager.component.css']
})
export class EditBannerManagerComponent implements OnInit {
  constructor(private bannerManagementService: ServiceBannerService,
              private dialog: MatDialog,
              private toastr: ToastrService,
              private storage: AngularFireStorage,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  public messageImageError;
  public imageBanner = null;
  public selectedImage: any = null;
  public listPosition: Position[];
  public listSize: Size[];
  public banner: Banner;
  public dayTime;
  public formEditBanner: FormGroup;
  public listBannerTop: number;
  public listBannerBot: number;
  public listBannerLeftOne: number;
  public listBannerLeftTwo: number;
  public listBannerLeftThree: number;
  public listBannerRightOne: number;
  public listBannerRightTwo: number;
  public listBannerRightThree: number;
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
    this.bannerManagementService.findBannerById(this.data).subscribe((data) => {
      this.banner = data;
      this.imageBanner = this.banner.image;
      this.formEditBanner = new FormGroup(
        {
          bannerId: new FormControl(this.banner.bannerId),
          duration: new FormControl(this.banner.duration, [Validators.required]),
          image: new FormControl(this.imageBanner),
          positionId: new FormControl(this.banner.position.positionId, [Validators.required]),
          sizeId: new FormControl(this.banner.size.sizeId, [Validators.required])
        }
      );
    });
    this.bannerManagementService.showAllPosition().subscribe((data) => {
      this.listPosition = data;
    });
    this.bannerManagementService.showAllSize().subscribe((data) => {
      this.listSize = data;
    });
  }

  editBanner() {
    switch (this.formEditBanner.value.duration) {
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
        this.dayTime = 0;
    }
    if (this.dayTime !== 0) {
      const milliseconds = new Date().getTime() + this.dayTime * 60 * 60 * 24 * 1000;
      this.formEditBanner.value.duration = new Date(milliseconds);
    }
    if (this.formEditBanner.valid && this.selectedImage !== null && this.imageBanner !== null && this.checkPositionBanner(this.formEditBanner.value.positionId) === true) {
      const name = this.selectedImage.name;
      const stringImage = name.substring(name.length - 3).toLowerCase();
      if (stringImage === 'png' || stringImage === 'jpg') {
        const fileName = 'imageBanner/' + name;
        const fileRef = this.storage.ref(fileName);
        this.openLoading();
        this.storage.upload(fileName, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
                this.formEditBanner.value.image = url;
                this.bannerManagementService.editAdvertiseBanner(this.formEditBanner.value).subscribe((data) => {
                  this.dialog.closeAll();
                  this.toastr.success('Chỉnh Sửa Banner Thành Công', 'Thông Báo!', {timeOut: 3000, progressAnimation: 'decreasing'});
                });
              }
            );
          })).subscribe();
      }
    } else if (this.formEditBanner.valid && this.imageBanner !== null && this.checkPositionBanner(this.formEditBanner.value.positionId) === true) {
      this.openLoading();
      setTimeout(() => {
        this.bannerManagementService.editAdvertiseBanner(this.formEditBanner.value).subscribe((data) => {
          this.dialog.closeAll();
          this.toastr.success('Chỉnh Sửa Banner Thành Công', 'Thông Báo!', {timeOut: 3000, progressAnimation: 'decreasing'});
        });
      });
    }
    if (this.checkPositionBanner(this.formEditBanner.value.positionId) === false && this.formEditBanner.valid && this.imageBanner !== null) {
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

  closeEditFormBanner() {
    this.dialog.closeAll();
  }

  checkFormEdit() {
    if (this.banner.image === this.formEditBanner.value.image && this.banner.size.sizeId === this.formEditBanner.value.sizeId
      && this.banner.position.positionId === this.formEditBanner.value.positionId
      && this.banner.duration === this.formEditBanner.value.duration) {
      return false;
    }
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
    this.formEditBanner.value.image = '';
    this.selectedImage = null;
  }

  checkPositionBanner(positionId: number) {
    if (this.banner.position.positionId !== positionId) {
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
    return true;
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
    return this.formEditBanner.get('duration');
  }

  get position() {
    return this.formEditBanner.get('positionId');
  }

  get size() {
    return this.formEditBanner.get('sizeId');
  }

  get image() {
    return this.formEditBanner.get('image');
  }
}
