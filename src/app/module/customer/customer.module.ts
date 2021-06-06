import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CustomerPageComponent} from './customer-layout/customer-page/customer-page.component';
import {ShowInfoComponent} from './customer-manager/show-info/show-info.component';
import {EditInfoComponent} from './customer-manager/edit-info/edit-info.component';
import {ChangePasswordComponent} from './customer-manager/change-password/change-password.component';
import {InboxComponent} from './customer-manager/inbox/inbox.component';
import {CreatePostComponent} from './customer-post/create-post/create-post.component';
import {DeletePostComponent} from './customer-post/delete-post/delete-post.component';
import {EditPostComponent} from './customer-post/edit-post/edit-post.component';
import {ListPostComponent} from './customer-post/list-post/list-post.component';
import {RouterModule} from '@angular/router';
import {CustomerRoutingModule} from "./customer-routing.module";
import {MainModule} from "../main/main.module";
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {environment} from "./customer-post/environments/environment";
import { CustomerContentComponent } from './customer-layout/customer-content/customer-content.component';
import {ToastrModule} from "ngx-toastr";
@NgModule({
  declarations: [CustomerPageComponent, ShowInfoComponent, EditInfoComponent, ChangePasswordComponent,
    InboxComponent, CreatePostComponent, DeletePostComponent, EditPostComponent, ListPostComponent,CustomerContentComponent],
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ]
})
export class CustomerModule {
}
