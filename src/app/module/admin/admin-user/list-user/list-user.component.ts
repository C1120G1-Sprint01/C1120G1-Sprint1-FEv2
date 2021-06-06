import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/User';
import {Account} from '../../../../model/Account';
import {Ward} from '../../../../model/Ward';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {ToastrService} from "ngx-toastr";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: User[] = [];
  public account: Account[] = [];
  public wards: Ward[] = [];
  keySearch: string = "";
  deleteId: number;
  deleteName: string;
  p: number = 1;
  page: number = 1;

  constructor(private serviceAdminService: ServiceAdminService,
              private toastr: ToastrService) {
    this.users = this.users.slice();
  }

  ngOnInit(): void {
    this.serviceAdminService.getAllUsers().subscribe(data => {
      this.users = data;
      if (data === null) {
        this.toastr.warning("Không tìm thấy dữ liệu", "Thông báo", {
          timeOut : 5000,
          progressAnimation: "increasing"
        });
      }
    })
  }


  // ngoc - seearch + pagination


  search(){
    this.serviceAdminService.searchUserBySomething(this.keySearch).subscribe(data => {
      if (data === null) {
        this.toastr.warning("Thông tin bạn tìm không tìm thấy trong hệ thống", "Thông báo");
      } else {
        this.users = data;
        this.toastr.success("Tìm thấy thông tin bạn muốn tìm", "Thông báo");
      }
    });
  }


  deleteSuccess() {
    this.ngOnInit();
    this.toastr.success("Xóa thành công", "Thông báo");
  }

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.users = data;
      return;
    }

    this.users = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'phone': return compare(a.phone, b.phone, isAsc);
        case 'address': return compare(a.ward.district.province.provinceName, b.ward.district.province.provinceName, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        default: return 0;
      }
    });
  }

  searchEnter() {
    this.serviceAdminService.searchUserBySomething(this.keySearch).subscribe(data => {
      this.users = data;
      if (data === null) {
        this.toastr.warning("Không tìm thấy dữ liệu", "Thông báo", {
          timeOut : 5000,
          progressAnimation: "increasing"
        });
      }
    })
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
