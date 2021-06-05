import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminBannerRoutingModule } from './admin-banner-routing.module';
import { BannerManagementComponent } from './banner-management/banner-management.component';
import {LoadingComponent} from "./loading/loading.component";
import {DisplayBannerTopComponent} from "./display-banner-top/display-banner-top.component";
import {DisplayBannerBotComponent} from "./display-banner-bot/display-banner-bot.component";
import {DisplayBannerLeftComponent} from "./display-banner-left/display-banner-left.component";
import {DisplayBannerRightComponent} from "./display-banner-right/display-banner-right.component";
import {EditBannerManagerComponent} from "./edit-banner-manager/edit-banner-manager.component";
import {AddBannerManagerComponent} from "./add-banner-manager/add-banner-manager.component";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
    declarations: [BannerManagementComponent, EditBannerManagerComponent, AddBannerManagerComponent, LoadingComponent, DisplayBannerTopComponent, DisplayBannerBotComponent, DisplayBannerLeftComponent, DisplayBannerRightComponent],
    exports: [
        DisplayBannerRightComponent,
        DisplayBannerTopComponent,
        DisplayBannerLeftComponent,
        DisplayBannerBotComponent
    ],
    imports: [
        CommonModule,
        AdminBannerRoutingModule,
        NgbCarouselModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        NgxPaginationModule
    ]
})
export class AdminBannerModule { }
