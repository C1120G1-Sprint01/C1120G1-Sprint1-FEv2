import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainPageComponent} from './main-layout/main-page/main-page.component';
import {MainChatComponent} from './main-chat/main-chat.component';
import {ListPostComponent} from './list-post/list-post.component';
import {ViewPostComponent} from './view-post/view-post.component';
import {RouterModule} from '@angular/router';
import {MainFooterComponent} from './main-layout/main-footer/main-footer.component';
import {MainHeaderComponent} from "./main-layout/main-header/main-header.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {EmojiModule} from "@ctrl/ngx-emoji-mart/ngx-emoji";
import {PickerModule} from "@ctrl/ngx-emoji-mart";


@NgModule({
  declarations: [MainPageComponent, MainChatComponent, ListPostComponent, ViewPostComponent, MainHeaderComponent, MainFooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    EmojiModule,
    PickerModule,
  ],
  exports: [MainChatComponent]
})
export class MainModule {
}
