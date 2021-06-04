import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBannerManagerComponent } from './add-banner-manager.component';

describe('AddBannerManagerComponent', () => {
  let component: AddBannerManagerComponent;
  let fixture: ComponentFixture<AddBannerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBannerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBannerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
