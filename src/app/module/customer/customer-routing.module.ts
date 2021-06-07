import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowInfoComponent} from './customer-manager/show-info/show-info.component';
import {EditInfoComponent} from './customer-manager/edit-info/edit-info.component';
import {ChangePasswordComponent} from './customer-manager/change-password/change-password.component';
import {ListPostComponent} from './customer-post/list-post/list-post.component';
import {EditPostComponent} from './customer-post/edit-post/edit-post.component';
import {DeletePostComponent} from './customer-post/delete-post/delete-post.component';
import {InboxComponent} from './customer-manager/inbox/inbox.component';
import {CustomerPageComponent} from "./customer-layout/customer-page/customer-page.component";

const routes: Routes = [
  {
    path: '',
    component: CustomerPageComponent,
    children: [
      {path: 'show-info', component: ShowInfoComponent},
      {path: 'edit', component: EditInfoComponent},
      {path: 'inbox', component: InboxComponent},
      {path: 'inbox/:id', component: InboxComponent},
      {path: 'change-password', component: ChangePasswordComponent},
      {path: 'posts', component: ListPostComponent},
      {path: 'posts/edit/:id', component: EditPostComponent},
      {path: 'posts/delete/:id', component: DeletePostComponent},
      {path: '**', redirectTo: 'show-info', pathMatch: 'full'},
      {path: '', redirectTo: 'show-info', pathMatch: 'full'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
