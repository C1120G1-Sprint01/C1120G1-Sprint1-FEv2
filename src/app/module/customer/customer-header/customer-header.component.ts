import {Component, OnInit, SimpleChanges} from '@angular/core';
import {SecurityService} from '../../../service/security/security.service';
import {TokenStorageService} from '../../../service/security/token-storage.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {

  roles: string[] = [];
  username: string = '';

  constructor(
    private securityService: SecurityService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      console.log('Getting username...');
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    } else {
      console.log('Reset username');
      this.username = '';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

}
