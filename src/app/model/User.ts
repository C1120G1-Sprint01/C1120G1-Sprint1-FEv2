import {Account} from './Account';
import {Ward} from './Ward';

export interface User {
  userId: number;
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
  ward: Ward;
  account: Account;
}
