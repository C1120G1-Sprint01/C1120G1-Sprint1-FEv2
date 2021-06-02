import {Category} from './Category';

export interface ChildCategory {
  childCategoryId: number;
  childCategoryName: string;
  category: Category;
}
