import {Component, OnInit} from '@angular/core';
import {ServiceBannerService} from '../../../../service/service-banner/service-banner.service';
import {Banner} from "../../../../model/Banner";

@Component({
  selector: 'app-display-banner-bot',
  templateUrl: './display-banner-bot.component.html',
  styleUrls: ['./display-banner-bot.component.css']
})
export class DisplayBannerBotComponent implements OnInit {

  constructor(private bannerManagementService: ServiceBannerService) {
  }

  public listBanner: Banner[];
  public banner: Banner;

  ngOnInit(): void {
    this.bannerManagementService.showAllAdvertiseBannerByPosition(2).subscribe((data) => {
      this.listBanner = data;
      this.banner = this.listBanner[0];
    });
  }

}
