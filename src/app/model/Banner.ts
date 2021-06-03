import {Size} from './Size';
import {Position} from './Position';

export interface Banner {
  bannerId: number;
  duration: any;
  image: string;
  position: Position;
  size: Size;
}
