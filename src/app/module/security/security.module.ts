import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { LogoutComponent } from './logout/logout.component';
import { GetBackPasswordComponent } from './get-back-password/get-back-password.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [LoginComponent, LogoutComponent, GetBackPasswordComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SecurityModule { }
