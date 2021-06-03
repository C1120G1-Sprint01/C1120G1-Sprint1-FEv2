import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminCategoryRoutingModule} from './admin-category-routing.module';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateChildCategoryComponent} from './create-child-category/create-child-category.component';
import {DeleteCategoryComponent} from './delete-category/delete-category.component';
import {DeleteChildCategoryComponent} from './delete-child-category/delete-child-category.component';
import {EditCategoryComponent} from './edit-category/edit-category.component';
import {EditChildCategoryComponent} from './edit-child-category/edit-child-category.component';
import {ListCategoryComponent} from './list-category/list-category.component';
import {ListChildCategoryComponent} from './list-child-category/list-child-category.component';
import {MainCategoryComponent} from './main-category/main-category.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MainModule} from "../../main/main.module";


@NgModule({
  declarations: [CreateCategoryComponent, CreateChildCategoryComponent, DeleteCategoryComponent, DeleteChildCategoryComponent,
    EditCategoryComponent, EditChildCategoryComponent, ListCategoryComponent, ListChildCategoryComponent, MainCategoryComponent],
  imports: [
    CommonModule,
    AdminCategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MainModule
  ]
})
export class AdminCategoryModule {
}
