import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainPageComponent} from './main-layout/main-page/main-page.component';
import {MainChatComponent} from './main-chat/main-chat.component';
import {ListPostComponent} from './list-post/list-post.component';
import {ViewPostComponent} from './view-post/view-post.component';
import {MainHeaderComponent} from './main-layout/main-header/main-header.component';
import {RouterModule} from '@angular/router';
import {MainFooterComponent} from './main-layout/main-footer/main-footer.component';


@NgModule({
  declarations: [MainPageComponent, MainChatComponent, ListPostComponent, ViewPostComponent, MainHeaderComponent, MainFooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MainModule {
}
