import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/User';
import {Account} from '../../../../model/Account';
import {Ward} from '../../../../model/Ward';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';
import {ToastrService} from "ngx-toastr";

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
  size = 5;
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  textSorting = '';
  onSorting = false;
  p: number = 1;
  constructor(private serviceAdminService: ServiceAdminService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.onSubmit(0);
  }
  // ngoc - seearch + pagination

  search(page){
    this.serviceAdminService.searchUserBySomething(this.keySearch , this.size).subscribe(data => {
      if (data === null) {
        this.toastr.warning("Thong tin ban tim khong thay trong he thong", "Thong bao");
        this.onSubmit(0);
      } else {
        this.pageClicked = page;
        this.users = data.content;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        this.toastr.success("Tim thay thong tin ban muon tim", "Thong Bao");
      }
    });
  }


  deleteSuccess() {
    this.ngOnInit();
    this.toastr.success("Xoa thanh cong", "Thong Bao");
  }

  onFirst() {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }

  }

  onSubmit(page) {
    this.serviceAdminService.getAllUsers(page, this.size, this.onSorting, this.textSorting).subscribe(
      data => {
        console.log(data)
        this.pageClicked = page;
        this.users = data.content;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);

      }, error1 => {
        if (error1.status == 401) {
          alert("You don't have role to access this page ! Please login by role admin to use it");
        }
      });
  }

  onNext() {
    if (this.pageClicked < this.totalPages -1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

  onLast() {
    this.pageClicked = this.totalPages -1;
    this.onSubmit(this.pageClicked);
  }

  onSortingChange(value) {
    if (this.textSorting == "") {
      this.textSorting = value;
    } else {
      this.textSorting = "";
    }
    this.ngOnInit();
  }

  onKeyDown(event) {
    if (event.key === "Enter") {
      console.log(event);
      this.onSubmit(0);
    }
  }
}
