import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../../service/security/token-storage.service";
import {SecurityService} from "../../../../service/security/security.service";

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {

  constructor(private tokenStorageService:TokenStorageService,
              private securityService:SecurityService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken() && this.securityService.isLoggedIn) {
      document.getElementById("clock").style.display = 'block';
      this.startToGetTime();
    } else {
      document.getElementById("clock").style.display = 'none';
    }
    window.onscroll = (x => {
      this.showBtnOnscroll();
    })
  }

  backTop() {
    window.scroll({top: 0, behavior: 'smooth'});
  }

  showBtnOnscroll() {
    let backToTopBtn = document.getElementById('backToTopBtn')
    if (document.documentElement.scrollTop > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none'
    }
  }

  startToGetTime() {
    this.getTimeToShow();
    setInterval(x => this.getTimeToShow(), 1000); //1 second
  }
  getTimeToShow() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let hourStr = (hours < 10) ? '0'+hours : hours;
    let minuteStr = (minutes < 10) ? '0'+minutes : minutes;
    let secondStr = (seconds < 10) ? '0'+seconds : seconds;

    let time = document.getElementById("time");
    let gmt = document.getElementById("gmt");
    if(time != null && gmt != null) {
      time.innerHTML = hourStr+':'+minuteStr+':'+secondStr;
      gmt.innerHTML = " GMT+7 Asia/Hà Nội";
    }
  }

}
