import {ChildCategory} from "./ChildCategory";

export interface Category {
  categoryId: number;
  categoryName: string;
  childCategoryList: ChildCategory[];
  deleteFlag: boolean;
}
