import {District} from "./District";

export interface Ward {
  wardId: number;
  wardName: string;
  district: District;
}
