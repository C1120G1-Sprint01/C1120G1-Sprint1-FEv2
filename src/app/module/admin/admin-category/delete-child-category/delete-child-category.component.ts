import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServiceAdminService} from "../../../../service/service-admin/service-admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChildCategory} from "../../../../model/ChildCategory";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete-child-category',
  templateUrl: './delete-child-category.component.html',
  styleUrls: ['./delete-child-category.component.css']
})
export class DeleteChildCategoryComponent implements OnInit {
  childCategoryDelete: ChildCategory;

  @Input()
  deleteId: number;
  @Input()
  deleteName: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  constructor(public serviceAdminService: ServiceAdminService,
              private active: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    // let id = this.active.snapshot.params['id'];
    //
    // this.serviceAdminService.getChildCategoryById(id).subscribe((data: ChildCategory) => {
    //   this.childCategoryDelete = data;
    // })
  }
  deleteChildCategory() {
    this.serviceAdminService.deleteChildCategory(this.deleteId).subscribe(data => {
      document.getElementById('closeModal').click();
      // this.router.navigateByUrl('main-category/child-category');
      this.deleteComplete.emit(true);
    });
    this.toastr.success('Xóa Thành Công !', 'Chuyên mục !');
  }
}
