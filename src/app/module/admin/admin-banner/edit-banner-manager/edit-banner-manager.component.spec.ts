import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBannerManagerComponent } from './edit-banner-manager.component';

describe('EditBannerManagerComponent', () => {
  let component: EditBannerManagerComponent;
  let fixture: ComponentFixture<EditBannerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBannerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBannerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
