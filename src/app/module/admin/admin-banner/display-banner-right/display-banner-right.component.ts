import { Component, OnInit } from '@angular/core';
import {ServiceBannerService} from '../../../../service/service-banner/service-banner.service';
import {Banner} from "../../../../model/Banner";

@Component({
  selector: 'app-display-banner-right',
  templateUrl: './display-banner-right.component.html',
  styleUrls: ['./display-banner-right.component.css']
})
export class DisplayBannerRightComponent implements OnInit {

  constructor(private bannerManagementService: ServiceBannerService) {
  }

  public listBannerOne: Banner[];
  public listBannerThree: Banner[];
  public listBannerTwo: Banner[];
  public bannerRightOne: Banner;
  public bannerRightTwo: Banner;
  public bannerRightThree: Banner;

  ngOnInit(): void {
    this.bannerManagementService.showAllAdvertiseBannerByPosition(3).subscribe((data) => {
      this.listBannerOne = data;
      this.bannerRightOne = this.listBannerOne[0];
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(4).subscribe((data) => {
      this.listBannerTwo = data;
      this.bannerRightTwo = this.listBannerTwo[0];
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(5).subscribe((data) => {
      this.listBannerThree = data;
      this.bannerRightThree = this.listBannerThree[0];
    });
  }

}
