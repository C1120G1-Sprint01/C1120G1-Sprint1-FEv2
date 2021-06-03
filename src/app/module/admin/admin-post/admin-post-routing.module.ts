import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListDetailComponent} from './list-detail/list-detail.component';
import {ListApproveComponent} from './list-approve/list-approve.component';
import {ListWaitComponent} from './list-wait/list-wait.component';
import {DetailAdminComponent} from './detail-admin/detail-admin.component';
import {ConfirmAdminComponent} from './confirm-admin/confirm-admin.component';
import {DeletePostAdminComponent} from './delete-post-admin/delete-post-admin.component';
import {WaitAdminComponent} from './wait-admin/wait-admin.component';
import {DeleteWaitComponent} from './delete-wait/delete-wait.component';
import {ConfirmWaitComponent} from './confirm-wait/confirm-wait.component';
import {PostStatisticsComponent} from './post-statistics/post-statistics.component';

const routes: Routes = [
  {path: 'list-detail', component: ListDetailComponent},
  {path: 'list-detail/:postId', component: DetailAdminComponent},
  {path: 'list-approve', component: ListApproveComponent},
  {path: 'list-approve/approve/:postId', component: ConfirmAdminComponent},
  {path: 'list-approve/delete/:postId', component: DeletePostAdminComponent},
  {path: 'list-approve/wait/:postId', component: WaitAdminComponent},
  {path: 'list-wait', component: ListWaitComponent},
  {path: 'list-wait/approve/:postId', component: ConfirmWaitComponent},
  {path: 'list-wait/delete/:postId', component: DeleteWaitComponent},
  {path: 'statistics', component: PostStatisticsComponent},
  {path: '', redirectTo: 'list-detail', pathMatch: 'full'},
  {path: '**', redirectTo: 'list-detail', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPostRoutingModule {}
