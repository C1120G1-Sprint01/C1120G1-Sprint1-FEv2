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

  public listBanner: Banner[];
  public banner: Banner;

  ngOnInit(): void {
    this.bannerManagementService.showAllAdvertiseBannerByPosition(4).subscribe((data) => {
      this.listBanner = data;
      this.banner = this.listBanner[0];
    });
  }
}
