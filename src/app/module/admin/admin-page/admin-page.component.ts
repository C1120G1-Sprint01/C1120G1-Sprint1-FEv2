import {Component, OnInit} from '@angular/core';

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
  public activeSeven = '';

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
    this.activeSeven = '';
  }
  activeNavOne() {
    this.activeZero = '';
    this.activeOne = 'bg-lightgray';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = '';
    this.activeSeven = '';
  }
  activeNavTwo() {
    this.activeZero = '';
    this.activeOne = '';
    this.activeTwo = 'bg-lightgray';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = '';
    this.activeSeven = '';
  }
  activeNavThree() {
    this.activeZero = '';
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = 'bg-lightgray';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = '';
    this.activeSeven = '';
  }
  activeNavFour() {
    this.activeZero = '';
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = 'bg-lightgray';
    this.activeFive = '';
    this.activeSix = '';
    this.activeSeven = '';
  }activeNavFive() {
    this.activeZero = '';
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = 'bg-lightgray';
    this.activeSix = '';
    this.activeSeven = '';
  }
  activeNavSix() {
    this.activeZero = '';
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = 'bg-lightgray';
    this.activeSeven = '';
  }
  activeNavSeven() {
    this.activeZero = '';
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.activeSix = '';
    this.activeSeven = 'bg-lightgray';
  }
}
