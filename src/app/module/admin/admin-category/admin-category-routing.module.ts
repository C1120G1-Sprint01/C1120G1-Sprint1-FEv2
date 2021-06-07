import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListCategoryComponent} from './list-category/list-category.component';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {EditCategoryComponent} from './edit-category/edit-category.component';
import {DeleteCategoryComponent} from './delete-category/delete-category.component';
import {ListChildCategoryComponent} from './list-child-category/list-child-category.component';
import {CreateChildCategoryComponent} from './create-child-category/create-child-category.component';
import {EditChildCategoryComponent} from './edit-child-category/edit-child-category.component';
import {DeleteChildCategoryComponent} from './delete-child-category/delete-child-category.component';
import {MainCategoryComponent} from './main-category/main-category.component';

const routes: Routes = [
  {path: '', component: MainCategoryComponent},
  {path: 'categories', component: ListCategoryComponent},
  {path: 'categories/create', component: CreateCategoryComponent},
  {path: 'categories/edit/:id', component: EditCategoryComponent},
  {path: 'categories/delete/:id', component: DeleteCategoryComponent},
  {path: 'child-categories', component: ListChildCategoryComponent},
  {path: 'child-categories/create', component: CreateChildCategoryComponent},
  {path: 'child-categories/edit/:id', component: EditChildCategoryComponent},
  {path: 'child-categories/delete/:id', component: DeleteChildCategoryComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCategoryRoutingModule {
}
