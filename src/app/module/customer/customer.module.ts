import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CustomerPageComponent} from './customer-page/customer-page.component';
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

@NgModule({
  declarations: [CustomerPageComponent, ShowInfoComponent, EditInfoComponent, ChangePasswordComponent,
    InboxComponent, CreatePostComponent, DeletePostComponent, EditPostComponent, ListPostComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule {
}
