import { Component, OnInit } from '@angular/core';
import {ServiceBannerService} from '../../../../service/service-banner/service-banner.service';
import {Banner} from "../../../../model/Banner";


@Component({
  selector: 'app-display-banner-left',
  templateUrl: './display-banner-left.component.html',
  styleUrls: ['./display-banner-left.component.css']
})
export class DisplayBannerLeftComponent implements OnInit {

  constructor(private bannerManagementService: ServiceBannerService) {
  }

  public listBannerOne: Banner[];
  public listBannerTwo: Banner[];
  public listBannerThree: Banner[];
  public bannerLeftOne: Banner;
  public bannerLeftTwo: Banner;
  public bannerLeftThree: Banner;

  ngOnInit(): void {
    this.bannerManagementService.showAllAdvertiseBannerByPosition(6).subscribe((data) => {
      this.listBannerOne = data;
      this.bannerLeftOne = this.listBannerOne[0];
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(7).subscribe((data) => {
      this.listBannerTwo = data;
      this.bannerLeftTwo = this.listBannerTwo[0];
    });
    this.bannerManagementService.showAllAdvertiseBannerByPosition(8).subscribe((data) => {
      this.listBannerThree = data;
      this.bannerLeftThree = this.listBannerThree[0];
    });
  }
}
