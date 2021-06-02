import {Province} from "./Province";

export interface District {
  districtId: number;
  districtName: string;
  province: Province;
}
