import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../../service/security/token-storage.service";
import {UserCustomerService} from "../../../../service/service-customer/user-customer.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  username;
  currentAccount: any;
  data;
  oldPass: string = '';
  notification: string;
  form: FormGroup;
  newPwNotify: string = '';

  constructor(private userService: UserCustomerService,
              private router: Router,
              private token: TokenStorageService,
              public formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {

    this.currentAccount = this.token.getUser();
    this.username = this.currentAccount.username;
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
      confirmNewPassword: ['', [Validators.required, this.comparePassword]]
    }, {validators: this.comparePassword })
  }


  comparePassword(c: AbstractControl) {
    const value = c.value;
    return (value.newPassword === value.confirmNewPassword) ? null : {
      passwordNotMatch: true
    };
  }

  getOldPass() {
    if (this.oldPass == null || this.oldPass == '' || this.oldPass == undefined) {
      this.notification = 'Vui lòng nhập mật khẩu';
    } else {
      this.userService.getPass(this.username, this.oldPass).subscribe(data => {
        if (data) {
          this.notification = '';
          this.showTableNewPw();
        } else {
          this.notification = 'Mật khẩu không đúng, bạn có chắc đây là mật khẩu hiện tại của bạn không';
        }
      }, error => {
        console.log("get error " + error + " at getOldPass() on ChangePasswordComponent");
      });
    }
  }

  showTableNewPw() {
    document.getElementById("tableOldPw").style.display = 'none';
    document.getElementById("tableNewPw").style.display = 'block';
  }

  submitNewPwForm(form: FormGroup) {
    this.userService.setNewPassword(this.username, form.value.newPassword).subscribe(data => {
      this.router.navigateByUrl("login");
    }, error => {
      this.newPwNotify = "Đã gặp sự cố, chưa thể cập nhật lại mật khẩu cho bạn!";
    })
  }

  resetForm() {
    this.form.reset();
  }
}
