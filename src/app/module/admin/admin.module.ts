import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';
import {CommonModule} from '@angular/common';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {MainModule} from "../main/main.module";

@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MainModule
  ]
})
export class AdminModule {
}
