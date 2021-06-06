import {Component, Injectable, OnInit} from '@angular/core';
import {Category} from "../../../../model/Category";
import {ChildCategory} from "../../../../model/ChildCategory";
import {CategoryService} from "../../../../service/service-customer/category.service";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  listCategory: Category[] = [];
  listChildCategory: ChildCategory[] = [];

  cateId: number = 1;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.findAllCategory().subscribe(data => {
      console.log("Data" + data)
      this.listCategory = data;
    }, error => {
      console.log("Error at findAllCategory(): " + error)
    });
  }

  openNav() {
    document.getElementById('myNav').style.width = '50%';
  }

  closeNav() {
    document.getElementById('myNav').style.width = '0%';
  }

  getCategoryId(categoryId: number) {
    if (categoryId != this.cateId) {
      document.getElementById(this.cateId + '').style.display = 'none';
    }
    this.cateId = categoryId;
    document.getElementById(categoryId + '').style.display = 'block';
    this.listChildCategory = [];
    console.log("Category : " + categoryId)
    this.categoryService.findAllChildCategoryByCategoryId(categoryId).subscribe(data => {
      this.listChildCategory = data;
    }, error => {
      console.log("get " + error + " at getCategoryId() ")
    });
  }
}
