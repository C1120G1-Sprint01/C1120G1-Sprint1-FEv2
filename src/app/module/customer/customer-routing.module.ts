import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerPageComponent} from './customer-page/customer-page.component';
import {ShowInfoComponent} from './customer-manager/show-info/show-info.component';
import {EditInfoComponent} from './customer-manager/edit-info/edit-info.component';
import {ChangePasswordComponent} from './customer-manager/change-password/change-password.component';
import {CreatePostComponent} from './customer-post/create-post/create-post.component';
import {ListPostComponent} from './customer-post/list-post/list-post.component';
import {EditPostComponent} from './customer-post/edit-post/edit-post.component';
import {DeletePostComponent} from './customer-post/delete-post/delete-post.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerPageComponent,
    children: [
      {path: '', component: ShowInfoComponent},
      {path: 'edit', component: EditInfoComponent},
      {path: 'inbox', component: ChangePasswordComponent},
      {path: 'change-password', component: ChangePasswordComponent},
      {path: 'posts', component: ListPostComponent},
      {path: 'posts/create', component: CreatePostComponent},
      {path: 'posts/edit/:id', component: EditPostComponent},
      {path: 'posts/delete/:id', component: DeletePostComponent},
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
