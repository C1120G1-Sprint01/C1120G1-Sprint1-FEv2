import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';


import {Notification} from '../../../../model/notification';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ZoomComponent} from '../zoom/zoom.component';
import * as $ from 'jquery';
import {EmojiEvent} from "@ctrl/ngx-emoji-mart/ngx-emoji";
import {User} from "../../../../model/User";
import {Account} from "../../../../model/Account";
import {Chat} from "../../../../model/chat";
import {Bot} from "../../../../model/bot";
import {ChatService} from "../../../../service/chat-box/chat.service";
import {TokenStorageService} from "../../../../service/security/token-storage.service";

@Component({
  selector: 'app-chat-room-admin',
  templateUrl: './chat-room-admin.component.html',
  styleUrls: ['./chat-room-admin.component.css']
})
export class ChatRoomAdminComponent implements OnInit, OnChanges {
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
    // let username = this.tokenStorage.getUser();
    await new Promise((resolve) => {
      this.chatService.findAccountByUserName('sonblack2').subscribe(data => {
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
      this.chatService.refChats.on('value', resp => {
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

      this.chatService.refRooms.orderByChild('roomName').equalTo(this.roomName).on('child_added', (resp2: any) => {
        this.user = resp2.val().user;
      });

      this.chatService.getNotiOfUser().on('child_added', (resp: any) => {
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
        this.addImageToFireBase();
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
    this.addImageToFireBase();
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
      this.chatService.refChats.push().set(chat).then(data => {
        this.loadImage = false;
        $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
      });
      const notification = new Notification(chat, false, 'admin', this.account.username, this.user.avatarUrl);
      this.chatService.addNewNoti(notification);
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
      this.chatService.readNoti(readNotification.key);
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

  addImageToFireBase() {
    this.tempFile = this.selectedImages;
    this.selectedImages = [];
    return new Promise(resolve => {
      Promise.all(this.tempFile.map(file =>
        new Promise((resolve) => {
          this.loadImage = true;
          const name = file.file.name;
          const fileRef = this.storage.ref(name);
          this.storage.upload(name, file.file).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL()
                .subscribe((url) => {
                  const chat = new Chat();
                  chat.message = url;
                  chat.roomName = this.roomName;
                  chat.nickname = this.nickname;
                  chat.timeSkip = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
                  chat.date = new Date().getTime();
                  chat.type = 'image';
                  this.chatService.refChats.push().set(chat).then(data => {
                    this.loadImage = false;
                    $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
                  });
                  resolve(1);
                });
            })).subscribe();
        }))).then(() => {
        resolve(1);
      });
    });
  }

  deleteUpdateImage($event) {
    if (this.selectedImages.length === 1) {
      this.selectedImages = [];
      $('#file-input').val('');
      return;
    }
    const index = $event.target.attributes['data-index'].value;
    this.selectedImages.splice(index, 1);
  }

  zoom(url) {
    this.dialog.open(ZoomComponent, {
      data: url,
      panelClass: 'custom-modalbox'
    });
  }

  addEmoji($event: EmojiEvent) {
    const value = this.chatForm.get("message");
    if (this.chatForm.get("message").value == null) {
      this.chatForm.get("message").setValue($event.emoji.native);
    } else {
      this.chatForm.get("message").setValue(value.value + $event.emoji.native);
    }
  }

  show() {
    if (this.isEmojiPickerVisible) {
      this.emojiPickerVisible = "show";
      this.isEmojiPickerVisible = false
    } else {
      this.emojiPickerVisible = "";
      this.isEmojiPickerVisible = true
    }
  }
}
