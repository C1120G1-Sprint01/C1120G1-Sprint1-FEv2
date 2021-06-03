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
  public listBannerTop: Banner[];
  public listBannerBot: Banner[];
  public listBannerLeft: Banner[];
  public listBannerRight: Banner[];

  ngOnInit(): void {
    this.bannerManagementService.showAllAdvertiseBannerByPosition(1).subscribe((data) => {
      this.listBannerTop = data;
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(2).subscribe((data) => {
      this.listBannerBot = data;
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(3).subscribe((data) => {
      this.listBannerRight = data;
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(4).subscribe((data) => {
      this.listBannerLeft = data;
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
        sizeId: new FormControl('', [Validators.required])
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
                  this.toastr.success('Thêm Mới Banner Thành Công', 'Thông Báo!', {timeOut: 3000, progressAnimation: 'decreasing'});
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
        return this.listBannerTop.length < 13;
      case 2:
        return this.listBannerBot.length === 0;
      case 3:
        return this.listBannerRight.length === 0;
      case 4:
        return this.listBannerLeft.length === 0;
      default:
    }
  }
  get duration() {
    return this.formCreateBanner.get('duration');
  }

  get position() {
    return this.formCreateBanner.get('positionId');
  }

  get size() {
    return this.formCreateBanner.get('sizeId');
  }

  get image() {
    return this.formCreateBanner.get('image');
  }
}
