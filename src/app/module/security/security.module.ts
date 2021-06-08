import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { LogoutComponent } from './logout/logout.component';
import { GetBackPasswordComponent } from './get-back-password/get-back-password.component';
import { RegisterComponent } from './register/register.component';
import {MainModule} from "../main/main.module";
import {MatSelectModule} from "@angular/material/select";
import { LoginGoogleComponent } from './login-google/login-google.component';
import {MatRadioModule} from "@angular/material/radio";
import { RegisterEmailComponent } from './register-email/register-email.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent, GetBackPasswordComponent, RegisterComponent, LoginGoogleComponent, RegisterEmailComponent],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MainModule,
        MatSelectModule,
        MatRadioModule
    ]
})
export class SecurityModule { }
