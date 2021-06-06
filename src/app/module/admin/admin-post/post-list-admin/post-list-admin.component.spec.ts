import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListAdminComponent } from './post-list-admin.component';

describe('PostListAdminComponent', () => {
  let component: PostListAdminComponent;
  let fixture: ComponentFixture<PostListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
