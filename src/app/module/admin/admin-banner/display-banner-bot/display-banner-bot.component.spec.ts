import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBannerBotComponent } from './display-banner-bot.component';

describe('DisplayBannerBotComponent', () => {
  let component: DisplayBannerBotComponent;
  let fixture: ComponentFixture<DisplayBannerBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBannerBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBannerBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
