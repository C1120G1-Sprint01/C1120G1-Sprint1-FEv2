import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../../../service/security/security.service";

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
     this.securityService.loginGoogle();
  }

}
