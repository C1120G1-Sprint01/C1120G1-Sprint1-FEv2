import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openNav() {
    document.getElementById('myNav').style.width = '50%';
  }

  closeNav() {
    document.getElementById('myNav').style.width = '0%';
  }

}
