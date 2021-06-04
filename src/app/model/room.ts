import {User} from './user';

export class Room {
  roomName: string;
  user: User;
  newMess: number;
  key: string;
  active: boolean;

  constructor(roomName: string, user: User, newMess: number) {
    this.roomName = roomName;
    this.user = user;
    this.newMess = newMess;
  }
}
