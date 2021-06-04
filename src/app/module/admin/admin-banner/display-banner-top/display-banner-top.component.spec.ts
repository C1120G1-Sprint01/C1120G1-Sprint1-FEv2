import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBannerTopComponent } from './display-banner-top.component';

describe('DisplayBannerTopComponent', () => {
  let component: DisplayBannerTopComponent;
  let fixture: ComponentFixture<DisplayBannerTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBannerTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBannerTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
