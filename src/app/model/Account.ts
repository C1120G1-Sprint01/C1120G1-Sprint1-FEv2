import {User} from './User';

export interface Account {
  username: string;
  password: string;
  registerDate: string;
  user: User;
}
