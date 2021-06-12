import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../../model/room";
import {Chat} from "../../model/chat";
import {Notification} from "../../model/notification";
import {Account} from "../../model/Account";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = 'http://localhost:8080/api/bot';

  constructor(private http: HttpClient) {
  }

  findAnswerByBot(question: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, question);
  }

  studyForBot(bot: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/study', bot);
  }

  findAccountByUserName(userName: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/account', userName);
  }

  findAccountRoleByAccount(account: Account): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/accountRole', account);
  }

  snapshotToArray = (snapshot: any) => {
    const returnArr = [];
    snapshot.forEach(function (childSnapshot: any) {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
    return returnArr;
  };


  get refRooms() {
    return firebase.database().ref('rooms/');
  }

  get refNoti() {
    return firebase.database().ref('notifications-admin/');
  }

  get refChats() {
    return firebase.database().ref('chats/');
  }

  getNotiOfUser() {
    return this.refNoti.orderByChild('role').equalTo('user');
  }

  readNoti(key) {
    return this.refNoti.child(key).child('isRead').set(true);
  }

  readNewMess(key) {
    return this.refRooms.child(key).child('newMess').set(0);
  }

  addNewRoom(room: Room) {
    this.refRooms.push().set(room);
  }

  addNewChat(chat: Chat) {
    this.refChats.push().set(chat);
  }

  addNewNoti(notification: Notification) {
    this.refNoti.push().set(notification);
  }

  // -------------

  get refRoomsCus() {
    return firebase.database().ref('rooms-cus/');
  }

  get refNotiCus() {
    return firebase.database().ref('notifications-cus/');
  }

  get refChatsCus() {
    return firebase.database().ref('chats-cus/');
  }

  getNotiOfUserCus() {
    return this.refNotiCus.orderByChild('role').equalTo('user');
  }

  readNotiCus(key) {
    return this.refNotiCus.child(key).child('isRead').set(true);
  }

  readNewMessCus(key) {
    return this.refRoomsCus.child(key).child('newMess').set(0);
  }

  addNewRoomCus(room: Room) {
    this.refRoomsCus.push().set(room);
  }

  addNewChatCus(chat: Chat) {
    this.refChatsCus.push().set(chat);
  }

  addNewNotiCus(notification: Notification) {
    this.refNotiCus.push().set(notification);
  }

}
