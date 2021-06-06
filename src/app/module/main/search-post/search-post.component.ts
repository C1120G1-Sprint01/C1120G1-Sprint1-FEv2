import {Component, OnInit} from '@angular/core';
import {differenceInDays, differenceInHours, differenceInMinutes} from "date-fns";
import {Category} from "../../../model/Category";
import {Province} from "../../../model/Province";
import {ServiceCustomerService} from "../../../service/service-customer/service-customer.service";
import {Router} from "@angular/router";
import {AddressService} from "../../../service/service-customer/address.service";
import {CategoryService} from "../../../service/service-customer/category.service";

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {
  listCategory: Category[] = [];
  listProvince: Province[] = [];
  keyword: string = '';
  category: string = '';
  province: string = '';
  listPost: any;
  listTime: string[] = [];
  private now: Date;
  private diff: Date;
  resultTime: number = 0;
  page: number;


  constructor(
    private _serviceCustomer: ServiceCustomerService,
    private _router: Router,
    private _addressService: AddressService,
    private _categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {

    this._categoryService.findAllCategory().subscribe(data => {
      console.log("Data" + data)
      this.listCategory = data;
    }, error => {
      console.log("Error at findAllCategory(): " + error)
    });

    this._addressService.findAllProvince().subscribe(data => {
      this.listProvince = data;
    }, error => {
      console.log("Error at findAllProvince(): " + error)
    });
  }

  onList(page: number) {
    this.page = page;
    this.listTime = [];
    this.search();
    for (let post of this.listPost.content) {
      this.listTime.push(this.calculateTime(post.postDateTime))
    }
  }

  calculateTime(diff: string): string {
    console.log("Get Time")
    this.now = new Date()
    this.diff = new Date(diff);
    this.resultTime = differenceInMinutes(this.now, this.diff);
    if (this.resultTime >= (24 * 60)) {
      return differenceInDays(this.now, this.diff) + " ngày trước";
    } else if (this.resultTime >= 60) {
      return differenceInHours(this.now, this.diff) + " giờ trước";
    }
    return this.resultTime + " phút trước";
  }

  search() {
    this._serviceCustomer.search(this.keyword, this.category, this.province, this.page).subscribe(data => {
      this.listPost = data;
    }, error => {
      console.log("Error at search() " + error);
    });
  }

  clickSearch() {
    this.onList(0);
  }

}
