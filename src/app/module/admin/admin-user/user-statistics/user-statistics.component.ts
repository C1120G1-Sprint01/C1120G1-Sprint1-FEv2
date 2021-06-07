import { Component, OnInit } from '@angular/core';
import {ServiceCustomerService} from "../../../../service/service-customer/service-customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Color, Label} from "ng2-charts";
import * as moment from "moment";

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {

  public startDate = '';
  public endDate = '';



  constructor(private customerService: ServiceCustomerService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService,
  ) {
  }

  ngOnInit(): void {
  }

  title = 'bar-chart';
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = [];

  barChartType: ChartType = 'line';
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

  public barChartColors: Color[] = [
    {backgroundColor: 'rgba(255, 159, 64, 0.2)'},
  ];

  barChartData: ChartDataSets[] = [
    {data: [], label: 'Thành viên mới'}
  ];

  onSubmit() {
    if(this.endDate<this.startDate){
      this.toast.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc', "Lỗi");
    }else if(this.startDate == this.endDate){
      this.toast.error('Ngày bắt đầu và  ngày kết thúc không được trùng nhau', "Lỗi");
    }else
      this.toast.success('Thống kê thành công!', "Thông báo");
    this.customerService.getUserStatistic(this.startDate, this.endDate).subscribe(response => {
      console.log(response);
      this.barChartLabels = [];
      this.barChartData = [];
      let successfulStatus = {data: [], label: 'Thành viên mới'};
      for (let item of response) {
        this.barChartLabels.push(moment(item.timeRegister).format('DD/MM/yyyy'));
        successfulStatus.data.push(item.countNewUser);
      }
      this.barChartData.push(successfulStatus);
    }, error => {
      console.log(error);
    });
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
