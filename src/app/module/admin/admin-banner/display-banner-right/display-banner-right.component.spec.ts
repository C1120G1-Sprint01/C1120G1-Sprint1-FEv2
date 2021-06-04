import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBannerRightComponent } from './display-banner-right.component';

describe('DisplayBannerRightComponent', () => {
  let component: DisplayBannerRightComponent;
  let fixture: ComponentFixture<DisplayBannerRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBannerRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBannerRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
