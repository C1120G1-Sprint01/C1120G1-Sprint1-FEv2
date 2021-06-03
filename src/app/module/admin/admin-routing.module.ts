import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {path: 'posts', loadChildren: () => import('./admin-post/admin-post.module').then(module => module.AdminPostModule)},
      {path: 'categories', loadChildren: () => import('./admin-category/admin-category.module').then(module => module.AdminCategoryModule)},
      {path: 'users', loadChildren: () => import('./admin-user/admin-user.module').then(module => module.AdminUserModule)},
      {path: 'banners', loadChildren: () => import('./admin-banner/admin-banner.module').then(module => module.AdminBannerModule)},
      {path: 'chat', loadChildren: () => import('./admin-chat/admin-chat.module').then(module => module.AdminChatModule)}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
