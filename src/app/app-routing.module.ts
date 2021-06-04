import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GetBackPasswordComponent} from './module/security/get-back-password/get-back-password.component';
import {LoginComponent} from './module/security/login/login.component';
import {LogoutComponent} from './module/security/logout/logout.component';
import {MainPageComponent} from './module/main/main-layout/main-page/main-page.component';
import {ListPostComponent} from './module/main/list-post/list-post.component';
import {ViewPostComponent} from './module/main/view-post/view-post.component';
import {MainChatComponent} from './module/main/main-chat/main-chat.component';
import {RegisterComponent} from './module/security/register/register.component';
import {CreatePostComponent} from "./module/customer/customer-post/create-post/create-post.component";

const routes: Routes = [

  {
    path: 'admin',
    loadChildren: () => import('./module/admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./module/customer/customer.module').then(module => module.CustomerModule)
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'login/getBackPw', component: GetBackPasswordComponent},
  {
    path: '',
    component: MainPageComponent,
    children: [
      {path: '', component: ListPostComponent},
      {path: 'chat', component: MainChatComponent},
      {path: 'post/create', component: CreatePostComponent},
      {path: 'post/:id', component: ViewPostComponent},
      {path: ':category', component: ListPostComponent},
      {path: ':category/:childCategory', component: ListPostComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
