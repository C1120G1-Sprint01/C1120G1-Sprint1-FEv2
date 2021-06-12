import {Component, OnInit} from '@angular/core';
import {Category} from "../../../model/Category";
import {Province} from "../../../model/Province";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressService} from "../../../service/service-customer/address.service";
import {CategoryService} from "../../../service/service-customer/category.service";
import {DateUtilService} from "../../../service/date-util/date-util.service";
import {ServicePostService} from "../../../service/service-post/service-post.service";
import {Post} from "../../../model/Post";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {
  defaultImgUrl: string = 'https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com/o/post%2Fnoimage-icon.jpg?'
    + 'alt=media&token=05c794cb-44e7-4705-8369-cb36fe0ece93';

  listCategory: Category[] = [];
  listProvince: Province[] = [];
  listPost: Post[] = [];
  listTime: string[] = [];

  searchForm: FormGroup;
  keyword: string = '';
  category: string = '';
  province: string = '';

  constructor(
    private postService: ServicePostService,
    private router: Router,
    private addressService: AddressService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private dateUtilService: DateUtilService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initData();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      keySearch: [""],
      category: [""],
      province: [""]
    });
  }

  initData() {
    this.getCategoryList();
    this.getProvinceList();
    this.getPostList();
  }

  getCategoryList() {
    this.categoryService.findAllCategory().subscribe(data => {
      console.log("Data" + data)
      this.listCategory = data;
    }, error => {
      console.log("Error at findAllCategory(): " + error)
    });
  }

  getProvinceList() {
    this.addressService.findAllProvince().subscribe(data => {
      this.listProvince = data;
    }, error => {
      console.log("Error at findAllProvince(): " + error)
    });
  }

  getPostList() {
    this.activatedRoute.queryParams.subscribe(params => {
        this.keyword = params.key;
        this.searchForm.patchValue({
          keySearch: this.keyword
        })

        this.category = params.category;
        this.province = params.province;
        console.log(params);

        if (params.hasOwnProperty("category") && params.hasOwnProperty("province")) {
          console.log("all");
          this.searchAdvance();
          if(!this.category){
            this.searchForm.controls['category'].reset("");
          }
          if(!this.province){
            this.searchForm.controls['province'].reset("");
          }
        } else if (params.hasOwnProperty("category")) {
          this.province = "";
          console.log("cat");
          this.searchAdvance();
        } else if (params.hasOwnProperty("province")) {
          this.category = "";
          console.log("pro");
          this.searchAdvance();
        } else {
          console.log("1");
          this.search();
        }
      }
    );
  }

  getTimeList() {
    this.listTime = [];
    for (let post of this.listPost) {
      this.listTime.push(this.dateUtilService.getDiffToNow(post.postDateTime));
    }
  }

  search() {
    console.log("search basic");
    this.postService.searchPostByTitleContaining(this.keyword).subscribe(data => {
      this.listPost = data;
      this.getTimeList();
    }, error => {
      console.log("Error at searchPostByTitleContaining() " + error);
    });
  }

  searchAdvance() {
    console.log("search advance");
    console.log(this.keyword);
    console.log(this.category);
    console.log(this.province);
    this.postService.searchAdvance(this.keyword, this.category, this.province).subscribe(data => {
      this.listPost = data;
      this.getTimeList();
    }, error => {
      console.log("Error at searchAdvance() " + error);
    });
  }

  submitForm() {
    this.keyword = this.searchForm.controls['keySearch'].value;
    this.category = this.searchForm.controls['category'].value.categoryName;
    this.category = this.category ? this.category : "";
    this.province = this.searchForm.controls['province'].value.provinceName;
    this.province = this.province ? this.province : "";
    console.log(this.keyword);
    console.log(this.category);
    console.log(this.province);
    this.router.navigate(["/search"],
      {queryParams: {key: this.keyword, category: this.category, province: this.province}});
  }
}
