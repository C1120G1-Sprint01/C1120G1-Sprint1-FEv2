import {Status} from './Status';
import {Image} from './Image';
import {ChildCategory} from './ChildCategory';
import {Ward} from "./Ward";
import {User} from "./User";

export interface Post {
  postId: number;
  posterName: string;
  phone: string;
  email: string;
  title: string;
  postType: boolean;
  postDateTime: string;
  enabled: boolean;
  price: number;
  description: string;
  status: Status;
  childCategory: ChildCategory;
  ward: Ward;
  user: User;
  imageSet: Image[];
}
