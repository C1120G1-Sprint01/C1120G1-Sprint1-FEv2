import {Chat} from './chat';

export class Notification {
  chat: Chat;
  isRead: boolean;
  role: string;
  userName: string;
  userAvatar: string;
  key: string;

  constructor(chat: Chat, isRead: boolean, role: string, userName: string, userAvatar: string) {
    this.chat = chat;
    this.isRead = isRead;
    this.role = role;
    this.userName = userName;
    this.userAvatar = userAvatar
  }
}
