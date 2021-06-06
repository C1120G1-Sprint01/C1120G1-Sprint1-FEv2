import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPostRoutingModule} from './admin-post-routing.module';
import {ConfirmWaitComponent} from './confirm-wait/confirm-wait.component';
import {ConfirmAdminComponent} from './confirm-admin/confirm-admin.component';
import {DeletePostAdminComponent} from './delete-post-admin/delete-post-admin.component';
import {DeleteWaitComponent} from './delete-wait/delete-wait.component';
import {DetailAdminComponent} from './detail-admin/detail-admin.component';
import {ListApproveComponent} from './list-approve/list-approve.component';
import {ListDetailComponent} from './list-detail/list-detail.component';
import {ListWaitComponent} from './list-wait/list-wait.component';
import {WaitAdminComponent} from './wait-admin/wait-admin.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {PostStatisticsComponent} from './post-statistics/post-statistics.component';
import {DetailApproveComponent} from './detail-approve/detail-approve.component';
import {DetailWaitComponent} from './detail-wait/detail-wait.component';
import {CancelApproveComponent} from './cancel-approve/cancel-approve.component';

@NgModule({
  declarations: [ConfirmAdminComponent, ConfirmWaitComponent, DeletePostAdminComponent, DeleteWaitComponent, DetailAdminComponent,
    ListApproveComponent, ListDetailComponent, ListWaitComponent, WaitAdminComponent, PostStatisticsComponent, DetailApproveComponent, DetailWaitComponent, CancelApproveComponent],
  imports: [
    CommonModule,
    AdminPostRoutingModule,
    NgxPaginationModule,
  ]
})
export class AdminPostModule {
}
