import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBannerLeftComponent } from './display-banner-left.component';

describe('DisplayBannerLeftComponent', () => {
  let component: DisplayBannerLeftComponent;
  let fixture: ComponentFixture<DisplayBannerLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBannerLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBannerLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
