import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-layout/main-page/main-page.component';
import {MainChatComponent} from './main-chat/main-chat.component';
import {ListPostComponent} from './list-post/list-post.component';
import {ViewPostComponent} from './view-post/view-post.component';
import {RouterModule} from '@angular/router';
import {MainFooterComponent} from './main-layout/main-footer/main-footer.component';
import {MainHeaderComponent} from "./main-layout/main-header/main-header.component";
import {SearchPostComponent} from './search-post/search-post.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreatePostComponent} from './create-post/create-post.component';
import {MainContentComponent} from './main-layout/main-content/main-content.component';
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {EmojiModule} from "@ctrl/ngx-emoji-mart/ngx-emoji";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {AdminBannerModule} from "../admin/admin-banner/admin-banner.module";
import { MainLoadingComponent } from './main-layout/main-loading/main-loading.component';


@NgModule({
  declarations: [MainPageComponent, MainChatComponent, ListPostComponent, CreatePostComponent,
    ViewPostComponent, MainHeaderComponent, MainFooterComponent, MainContentComponent, SearchPostComponent, MainLoadingComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AdminBannerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    MainHeaderComponent,
    MainFooterComponent,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    EmojiModule,
    PickerModule,
    MainChatComponent,
  ],
})

export class MainModule {
}
