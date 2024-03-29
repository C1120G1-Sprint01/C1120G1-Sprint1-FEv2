import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from "../../../../model/room";
import {Account} from "../../../../model/Account";
import {Notification} from "../../../../model/notification";
import {ChatService} from "../../../../service/chat-box/chat.service";
import {TokenStorageService} from "../../../../service/security/token-storage.service";

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {
  nickname = '';
  rooms = new Array<Room>();
  isLoadingResults: boolean;
  notifications = new Array<Notification>();
  year = new Date().getFullYear();
  roomName: string;
  account: Account;
  searchValue: string;
  tempRooms = new Array<Room>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private chatService: ChatService,
              private tokenStorage: TokenStorageService) {
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
        return resolve(1);
      });
    });
    this.nickname =this.account.username;
    this.isLoadingResults = true;
    this.chatService.refRooms.on('value', resp => {
      this.rooms = this.chatService.snapshotToArray(resp);
      this.tempRooms = this.rooms;
      if (this.rooms) {
        this.isLoadingResults = false;
      }
      for (const roomFB of this.rooms) {
        if (roomFB.active){
          this.roomName = roomFB.roomName;
          break;
        }
      }
    });

    this.chatService.getNotiOfUser().on('value' , (resp: any) => {
      this.notifications = this.chatService.snapshotToArray(resp).filter(x => x.isRead === false);
    });

  }


  enterChatRoom(room: Room) {
    this.chatService.readNewMess(room.key);
    for (const readNotification of this.notifications) {
      if (readNotification.chat.roomName === room.roomName) {
        this.chatService.readNoti(readNotification.key);
      }
    }
    for (const roomFB of this.rooms) {
      if (roomFB.key === room.key) {
        this.chatService.refRooms.child(roomFB.key).child('active').set(true);
      }
      else {
        this.chatService.refRooms.child(roomFB.key).child('active').set(false);
      }
    }
    this.roomName = room.roomName;
  }

  search() {
    if (this.searchValue === undefined || this.searchValue.trim() === '') {
      this.searchValue = '';
      this.rooms = this.tempRooms;
    }
    const tempt = new Array<Room>();
    for (const room of this.rooms) {
      if (room.user){
        if (room.user.account.username.includes(this.searchValue)) {
          tempt.push(room);
        }
      } else {
        if (room.roomName.includes(this.searchValue)) {
          tempt.push(room);
        }
      }
    }
    this.rooms = tempt;
    this.searchValue = '';
  }
}
