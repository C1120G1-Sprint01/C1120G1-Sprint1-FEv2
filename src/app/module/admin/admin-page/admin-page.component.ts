import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor() {
  }
  public activeZero = 'bg-lightgray';
  public activeOne = '';
  public activeTwo = '';
  public activeThree = '';
  public activeFour = '';
  public activeFive = '';
  public activeSix = '';

  ngOnInit(): void {
  }
  activeNavZero() {
    this.activeZero = 'bg-lightgray';
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = '';
  }
  activeNavOne() {
    this.activeZero = '';
    this.activeOne = 'bg-lightgray';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = '';
  }
  activeNavTwo() {
    this.activeZero = '';
    this.activeOne = '';
    this.activeTwo = 'bg-lightgray';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = '';
  }
  activeNavThree() {
    this.activeZero = '';
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = 'bg-lightgray';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = '';
  }
  activeNavFour() {
    this.activeZero = '';
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = 'bg-lightgray';
    this.activeFive = '';
    this.activeSix = '';
  }activeNavFive() {
    this.activeZero = '';
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = 'bg-lightgray';
    this.activeSix = '';
  }
  activeNavSix() {
    this.activeZero = '';
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = 'bg-lightgray';
  }


}
