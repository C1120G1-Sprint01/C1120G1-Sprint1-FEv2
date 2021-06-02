import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  openNav() {
    document.getElementById('myNav').style.width = '50%';
  }

  closeNav() {
    document.getElementById('myNav').style.width = '0%';
  }

}
