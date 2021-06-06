import {Component, OnInit} from '@angular/core';
import {ServiceBannerService} from '../../../../service/service-banner/service-banner.service';
import {Banner} from "../../../../model/Banner";

@Component({
  selector: 'app-display-banner-top',
  templateUrl: './display-banner-top.component.html',
  styleUrls: ['./display-banner-top.component.css']
})
export class DisplayBannerTopComponent implements OnInit {

  constructor(private bannerManagementService: ServiceBannerService) {
  }
  public listBanner: Banner[];
  showNavigationArrows = false;
  showNavigationIndicators = true;

  ngOnInit(): void {
    this.bannerManagementService.showAllAdvertiseBannerByPosition(1).subscribe((data) => {
      this.listBanner = data;
    });
  }
}
