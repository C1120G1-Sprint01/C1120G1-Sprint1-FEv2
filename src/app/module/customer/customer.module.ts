import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CustomerPageComponent} from './customer-layout/customer-page/customer-page.component';
import {ShowInfoComponent} from './customer-manager/show-info/show-info.component';
import {EditInfoComponent} from './customer-manager/edit-info/edit-info.component';
import {ChangePasswordComponent} from './customer-manager/change-password/change-password.component';
import {InboxComponent} from './customer-manager/inbox/inbox.component';
import {DeletePostComponent} from './customer-post/delete-post/delete-post.component';
import {EditPostComponent} from './customer-post/edit-post/edit-post.component';
import {ListPostComponent} from './customer-post/list-post/list-post.component';

import {RouterModule} from '@angular/router';
<<<<<<< HEAD


import { CustomerRoutingModule } from './customer-routing.module';
import { environment } from './customer-post/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MainModule } from '../main/main.module';
import { CustomerContentComponent } from './customer-layout/customer-content/customer-content.component';
import {EmojiModule} from "@ctrl/ngx-emoji-mart/ngx-emoji";




=======
import {CustomerRoutingModule} from "./customer-routing.module";
import {MainModule} from "../main/main.module";
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {environment} from "../../../environments/environment";
import {CustomerContentComponent} from './customer-layout/customer-content/customer-content.component';
>>>>>>> 41ecfd4158f09c1b7ac1d553be8bb1d9ee314d89
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [CustomerPageComponent, ShowInfoComponent, EditInfoComponent, ChangePasswordComponent,
    InboxComponent, DeletePostComponent, EditPostComponent, ListPostComponent, CustomerContentComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule,
    MainModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    RouterModule,
    CustomerRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    EmojiModule,
    AngularFireStorageModule

  ]
})
export class CustomerModule {
}
