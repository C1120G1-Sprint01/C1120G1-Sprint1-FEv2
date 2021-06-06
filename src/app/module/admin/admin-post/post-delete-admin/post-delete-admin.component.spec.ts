import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDeleteAdminComponent } from './post-delete-admin.component';

describe('PostDeleteAdminComponent', () => {
  let component: PostDeleteAdminComponent;
  let fixture: ComponentFixture<PostDeleteAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDeleteAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDeleteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
