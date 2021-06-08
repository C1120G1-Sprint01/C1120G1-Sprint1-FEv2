import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SecurityService} from "../../../service/security/security.service";

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {

  }

}
