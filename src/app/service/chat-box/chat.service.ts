import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../../model/room";
import {Chat} from "../../model/chat";
import {Notification} from "../../model/notification";

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
    console.log(bot);
    return this.http.post<any>(this.baseUrl + '/study', bot);
  }

  findAccountByUserName(userName: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/account', userName);
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

}
