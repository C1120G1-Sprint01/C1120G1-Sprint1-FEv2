import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminUserRoutingModule} from './admin-user-routing.module';
import {EditUserComponent} from './edit-user/edit-user.component';
import {DeleteUserComponent} from './delete-user/delete-user.component';
import {ListUserComponent} from './list-user/list-user.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatSortModule} from "@angular/material/sort";
import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [EditUserComponent, DeleteUserComponent, ListUserComponent, CreateUserComponent, UserStatisticsComponent],
    imports: [
        CommonModule,
        AdminUserRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        MatSortModule,
        ChartsModule
    ]
})
export class AdminUserModule {
}
