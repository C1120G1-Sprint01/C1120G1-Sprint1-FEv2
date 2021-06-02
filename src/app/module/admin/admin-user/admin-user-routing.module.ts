import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListUserComponent} from './list-user/list-user.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {DeleteUserComponent} from './delete-user/delete-user.component';
import {UserStatisticsComponent} from './user-statistics/user-statistics.component';


const routes: Routes = [
  {path: '', component: ListUserComponent},
  {path: 'create', component: CreateUserComponent},
  {path: 'edit/:id', component: EditUserComponent},
  {path: 'delete', component: DeleteUserComponent},
  {path: 'statistics', component: UserStatisticsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule {
}
