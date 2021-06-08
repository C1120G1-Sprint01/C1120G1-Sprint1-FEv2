import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {ServicePostService} from "../../../../service/service-post/service-post.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Color, Label} from "ng2-charts";

@Component({
  selector: 'app-post-statistics',
  templateUrl: './post-statistics.component.html',
  styleUrls: ['./post-statistics.component.css']
})
export class PostStatisticsComponent implements OnInit {

  public endDate = '';
  public startDate = '';



  constructor(private _postService: ServicePostService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
  }

  title = 'bar-chart';
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 20,
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 20,
        }
      }]
    }
  };
  public barChartColors: Color[] = [
    {backgroundColor: 'rgba(190,255,72,0.75)'},
    {backgroundColor: 'rgba(255,165,113,0.75)'},
  ];

  barChartLabels: Label[] = [];

  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins: any = {
    'backgroundColor': [
      '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#E7E9ED',
      '#36A2EB'
    ]
  };

  barChartData: ChartDataSets[] = [
    {data: [], label: 'Bài Đăng Thành Công '},
    {data: [], label: 'Bài Đăng Thất Bại '}
  ];

  onSubmit() {
    if(this.endDate<this.startDate){
      this.toastr.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
    }else if(this.startDate == this.endDate){
      this.toastr.error('Ngày bắt đầu và  ngày kết thúc không được trùng nhau');
    }else
      this.toastr.success('Thống kê thành công', "Thông báo");
    this._postService.getQuantityStatistic(this.startDate, this.endDate).subscribe(response => {
      console.log(response);
      this.barChartLabels = [];
      this.barChartData = [];
      let successfulStatus = {data: [], label: 'Bài Đăng Thành Công'};
      let failureStatus = {data: [], label: 'Bài Đăng Thất Bại'};
      for (let item of response) {
        this.barChartLabels.push(moment(item.timePost).format('DD/MM/yyyy'));
        successfulStatus.data.push(item.countPostSuccess);
        failureStatus.data.push(item.countPostFailure);
      }
      this.barChartData.push(successfulStatus);
      this.barChartData.push(failureStatus);
    }, error => {
      console.log(error);
    });
  }
}
