import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Bot } from 'src/app/model/bot';
import { Chat } from 'src/app/model/chat';
import { User } from 'src/app/model/User';
import { ChatService } from 'src/app/service/chat-box/chat.service';
import { TokenStorageService } from 'src/app/service/security/token-storage.service';
import * as $ from 'jquery';
import {Account} from "../../../../model/Account";
import {Notification} from '../../../../model/notification';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  chatForm: FormGroup;
  nickname = '';
  @Input() roomName: string;
  message = '';
  user: User;
  account: Account;
  chats = new Array<Chat>();
  selectedImages = [];
  tempFile = [];
  loadImage: boolean;
  notifications = new Array<Notification>();
  bot: Bot;
  emojiPickerVisible = "";
  isEmojiPickerVisible = true;
  question: string;
  answer: string;
  role: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public datePipe: DatePipe,
              private chatService: ChatService,
              public storage: AngularFireStorage,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private tokenStorage: TokenStorageService) {
  }

  ngOnChanges(): void {
    this.getData();
  }

  async ngOnInit() {
    let username = this.tokenStorage.getUser();
    await new Promise((resolve) => {
      this.chatService.findAccountByUserName(username.username).subscribe(data => {
        this.account = {
          username: data.username,
          password: data.password,
          registerDate: data.registerDate,
          user: data.user
        };
        this.user = data.user;
        return resolve(1);
      });
    });
    this.chatForm = this.formBuilder.group({
      message: [null, [Validators.required, Validators.maxLength(100)]]
    });

    this.nickname = this.account.username;
    this.getData();
  }

  getData() {
    this.answer = null;
    this.question = null;
    if (this.roomName) {
      this.chatService.refChatsCus.on('value', resp => {
        this.chats = this.chatService.snapshotToArray(resp).filter(x => x.roomName === this.roomName);
        let length = this.chats.length;
        if (this.chats[length - 1].message === 'Vui lòng đợi trong giây lát!!') {
          this.question = this.chats[length - 2].message;
        }
        this.setTimeForChat();
        setTimeout(function () {
          $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
        }, 2000);
      });

      this.chatService.refRoomsCus.orderByChild('roomName').equalTo(this.roomName).on('child_added', (resp2: any) => {
        this.user = resp2.val().user;
      });

      this.chatService.getNotiOfUserCus().on('child_added', (resp: any) => {
        this.notifications = this.chatService.snapshotToArray(resp).filter(x => x.roomName === this.roomName);
      });

      if (this.user) {
        this.role = 'Thành Viên';
      }
    }
  }

  onFormSubmit(form: any, type: string) {
    if (this.chatForm.get('message').errors?.required || this.chatForm.get('message').value.trim() == '') {
      if (this.selectedImages.length !== 0) {
        // this.addImageToFireBase();
        this.chatForm.reset();
        return;
      } else {
        this.snackBar.open('Không được để trống nội dung', 'X',
          {
            duration: 5000,
          });
        this.chatForm.reset();
        return;
      }
    }
    if (this.chatForm.get('message').errors?.maxlength) {
      this.snackBar.open('Tin nhắn bạn nhập quá dài', 'X',
        {
          duration: 5000,
        });
      this.chatForm.reset();
      return;
    }
    // this.addImageToFireBase();
    $('#file-input').val('');
    this.chatForm.reset();
    if (form.message) {
      const chat = form;
      chat.roomName = this.roomName;
      chat.nickname = this.nickname;
      chat.timeSkip = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
      chat.date = new Date().getTime();
      chat.message = form.message.trim();
      this.answer = form.message.trim();
      chat.type = type;
      this.chatService.refChatsCus.push().set(chat).then(data => {
        this.loadImage = false;
        $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
      });
      const notification = new Notification(chat, false, 'admin', this.account.username, this.user.avatarUrl);
      this.chatService.addNewNotiCus(notification);
      if (this.question != null) {
        this.bot = {
          question: this.question,
          answer: this.answer
        };
        this.chatService.studyForBot(this.bot).subscribe();
      }
    }
  }

  private setTimeForChat() {
    const currentDate = new Date().getTime();
    for (const chat of this.chats) {
      const minute = (currentDate - chat.date) / (1000 * 60);
      if (minute < 1) {
        chat.timeSkip = 'vừa xong';
        continue;
      } else if (minute > 1 && minute < 60) {
        chat.timeSkip = Math.round(minute) + ' phút trước';
        continue;
      }
      const hour = minute / 60;

      if (hour < 2) {
        chat.timeSkip = Math.round(hour) + ' giờ trước';
      } else if (hour > 2 && hour < 24) {
        chat.timeSkip = Math.round(hour) + ' giờ trước';
      } else {
        chat.timeSkip = chat.timeSkip.slice(0, 10);
      }
    }
  }

  readAllNoti() {
    for (const readNotification of this.notifications) {
      this.chatService.readNotiCus(readNotification.key);
    }
  }

  importImages($event) {
    const files = $event.target.files;
    for (const file of files) {
      const name = file.type.toString();
      const size = file.size;
      if (!name.includes('image')) {
        this.snackBar.open('Đây không phải hình ảnh', 'X',
          {
            duration: 5000,
          }
        );
        return;
      }
      if (size > 1000000) {
        this.snackBar.open('Dung lượng ảnh quá cao', 'X',
          {
            duration: 5000,
          }
        );
        return;
      }
    }

    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push({url: e.target.result, file});
        };
        reader.readAsDataURL(file);
      }
    }
    $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
  }

}
