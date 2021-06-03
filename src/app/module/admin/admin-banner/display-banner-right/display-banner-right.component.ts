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

  public listBanner: Banner[];
  public banner: Banner;

  ngOnInit(): void {
    this.bannerManagementService.showAllAdvertiseBannerByPosition(3).subscribe((data) => {
      this.listBanner = data;
      this.banner = this.listBanner[0];
    });
  }

}
