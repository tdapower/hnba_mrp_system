import { Component, OnInit } from '@angular/core';
import { MainDashboardService } from '../../../shared/services/main-dashboard/main-dashboard.service';

import { Observable } from 'rxjs/Rx';
import { IMainDashboard } from '../../../shared/models/mainDashboard.model';
@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  ChartLabels: string;
  ChartData1Label: string;
  ChartData1: string;
  ChartData2Label: string;
  ChartData2: string;


  constructor(private mainDashboardService: MainDashboardService ) {
    this.loadBarChartData();
    this.loadLoanTypeSummary();

    Observable.interval(1000 * 600).subscribe(x => {
      this.loadBarChartData();
      this.loadLoanTypeSummary();
    });
   }

  ngOnInit() {


  }



   // Pie
   public pieChartLabels:string[] = ["a"];
   public pieChartData:number[] = [50];
   public pieChartType:string = 'pie';
 
   

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: any[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;


  public barChartData: any[] = [
    { data: [], label: 'Series A' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  loadBarChartData() {


    this.mainDashboardService.getMainDashboardData()
      .subscribe((data) => {

        let obj: IMainDashboard = JSON.parse(data);


        let chartdata = [];

        for (let i = 0; i < obj.ChartData1.split(',').length; i++) {
          chartdata.push(Number(obj.ChartData1.split(',')[i]));
        }

        
        for (let i = 0; i < obj.ChartLabels.split(',').length; i++) {
          this.barChartLabels[i] = (obj.ChartLabels.split(',')[i].replace(/"/g, ''));
        }



        let clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = chartdata;
        clone[0].label = obj.ChartData1Label;
        this.barChartData = clone;


      },
      (err) => {

        console.log(err);

      });
  }




  loadLoanTypeSummary() {
   
    console.log(this.pieChartData);
    
        this.mainDashboardService.getLoanTypeSummary()
          .subscribe((data) => {
            let obj: IMainDashboard = JSON.parse(data);

            for (let i = 0; i < obj.ChartData1Label.split(',').length; i++) {
              this.pieChartLabels[i] = (obj.ChartData1Label.split(',')[i].replace(/"/g, ''));
            }



            for (let i = 0; i < obj.ChartData1.split(',').length; i++) {
             this.pieChartData[i]=Number(obj.ChartData1.split(',')[i]);
          
            }
 
            this.pieChartLabels = [].concat(this.pieChartLabels);
            this.pieChartData = [].concat(this.pieChartData);
    
          },
          (err) => {
    
            console.log(err);
    
          });
      }
}
