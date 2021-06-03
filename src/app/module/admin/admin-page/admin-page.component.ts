import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor() {
  }

  public activeOne = 'bg-lightgray';
  public activeTwo = '';
  public activeThree = '';
  public activeFour = '';
  public activeFive = '';
  public activeSix = '';

  ngOnInit(): void {
  }


  activeNavOne() {
    this.activeOne = 'bg-lightgray';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = '';

  }
  activeNavTwo() {
    this.activeOne = '';
    this.activeTwo = 'bg-lightgray';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = '';

  }
  activeNavThree() {
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = 'bg-lightgray';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = '';

  }
  activeNavFour() {
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = 'bg-lightgray';
    this.activeFive = '';
    this.activeSix = '';

  }activeNavFive() {
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = 'bg-lightgray';
    this.activeSix = '';

  }
  activeNavSix() {
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = 'bg-lightgray';
  }


}
