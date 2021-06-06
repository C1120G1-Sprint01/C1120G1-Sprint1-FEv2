import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainPageComponent} from './main-layout/main-page/main-page.component';
import {MainChatComponent} from './main-chat/main-chat.component';
import {ListPostComponent} from './list-post/list-post.component';
import {ViewPostComponent} from './view-post/view-post.component';
import {RouterModule} from '@angular/router';
import {MainFooterComponent} from './main-layout/main-footer/main-footer.component';
import {MainHeaderComponent} from "./main-layout/main-header/main-header.component";
import { SearchPostComponent } from './search-post/search-post.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreatePostComponent } from './create-post/create-post.component';
import { MainContentComponent } from './main-layout/main-content/main-content.component';


@NgModule({
  declarations: [MainPageComponent, MainChatComponent, ListPostComponent, ViewPostComponent, MainHeaderComponent, MainFooterComponent, SearchPostComponent, CreatePostComponent, MainContentComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class MainModule {
}
