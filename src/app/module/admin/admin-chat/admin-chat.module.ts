import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminChatRoutingModule} from './admin-chat-routing.module';
import {ZoomComponent} from './zoom/zoom.component';
import {AdminChatComponent} from './admin-chat/admin-chat.component';
import {ChatRoomAdminComponent} from './chat-room-admin/chat-room-admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {MatButtonModule} from "@angular/material/button";
import {EmojiModule} from "@ctrl/ngx-emoji-mart/ngx-emoji";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [ZoomComponent, AdminChatComponent, ChatRoomAdminComponent],
  imports: [
    CommonModule,
    AdminChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    PickerModule,
    EmojiModule,
    HttpClientModule
  ]
})
export class AdminChatModule {
}
