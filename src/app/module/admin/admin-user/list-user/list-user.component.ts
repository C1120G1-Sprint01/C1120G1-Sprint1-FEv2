import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/User';
import {Account} from '../../../../model/Account';
import {Ward} from '../../../../model/Ward';
import {ServiceAdminService} from '../../../../service/service-admin/service-admin.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public users: User[] = [];
  public account: Account[] = [];
  public wards: Ward[] = [];
  keySearch = '';
  deleteId: number;
  deleteName: string;

  constructor(private serviceAdminService: ServiceAdminService) {
  }

  ngOnInit(): void {
    this.serviceAdminService.getAllUser().subscribe(data => {
      this.users = data;
    });
    this.serviceAdminService.getAllAccount().subscribe(data => {
      this.account = data;
    });
    this.serviceAdminService.getAllWard().subscribe(data => {
      this.wards = data;
    }, error => {
      alert('No data in DB');
    });
  }

  logout() {

  }

  search() {

  }

  deleteSuccess() {
    this.ngOnInit();
  }

}
