import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../../../service/security/security.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-get-back-password',
  templateUrl: './get-back-password.component.html',
  styleUrls: ['./get-back-password.component.css']
})
export class GetBackPasswordComponent implements OnInit {
  form: FormGroup;
  newPwForm:FormGroup;
  wrongEmail: boolean = true;
  email:string = '';
  code: string = '';
  inputCode: string = '';
  codeNotify: string = '';
  pwNotify: string = '';


  constructor(private formBuilder:FormBuilder,
              private securityService:SecurityService,
              private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.newPwForm = this.formBuilder.group({
      newPw: ['', [Validators.required, Validators.minLength(6)]],
      confirmPw: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  checkEmail() {
    this.email = this.form.value.email;
    console.log(this.email);
    this.securityService.checkEmail(this.email).subscribe(data => {
      if (data) {
        this.wrongEmail = false;
        this.code = data;
        console.log("Email is in system")
        console.log("CODE : "+ data)
        this.showInputCode();
      } else {
        this.wrongEmail = true;
        console.log("Email is not in system")
      }
    }, error => {
      console.log("get "+ error+ " on checkEmail()")
    })
  }

  showInputCode(){
    document.getElementById("inputCodeForm").style.display = 'block';
    document.getElementById("getPwForm").style.display = 'none';
  }

  checkCode() {
    if (this.code == this.inputCode) {
      document.getElementById("inputCodeForm").style.display = 'none';
      document.getElementById("inputNewPw").style.display = 'block';
    } else {
      this.codeNotify = 'Mã code bạn nhập không chính xác';
    }
  }

  changePw() {
    if (this.newPwForm.value.newPw != this.newPwForm.value.confirmPw){
      this.pwNotify = "Mật khẩu không khớp. Vui lòng nhập lại mật khẩu";
    } else {

      this.securityService.saveNewPw(this.newPwForm.value.newPw, this.email).subscribe(data => {
        console.log("OK");
      }, error => {
        console.log("get error");
      })
      this.router.navigateByUrl("homepage");
    }
  }
}
