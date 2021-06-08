import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../../../service/security/security.service";

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.css']
})
export class RegisterEmailComponent implements OnInit {
  email :string = '';
  result : string = '';

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.checkRegisterEmail();
  }

  checkRegisterEmail(){
    this.securityService.registerEmail(this.email).subscribe(data => {
     return this.result = data;
    })
  }
}
