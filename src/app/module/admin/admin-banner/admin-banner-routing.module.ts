import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BannerManagementComponent} from "./banner-management/banner-management.component";
import {HomeTestComponent} from "./home-test/home-test.component";


const routes: Routes = [
  {path:'',component: BannerManagementComponent},
  {path:'home',component: HomeTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBannerRoutingModule { }
