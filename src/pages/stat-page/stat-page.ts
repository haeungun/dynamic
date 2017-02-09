import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the StatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stat-page',
  templateUrl: 'stat-page.html'
})
export class StatPage {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };
  public barChartLabels:string[] = ['매봉남', '매봉여', '법동남', '법동여', '송촌남', '송촌여', '연합남', '연합여', '총계'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barColors: Array<any> = [{
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
  },
  {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
  }];
  public barChartData:any[] = [
    {data: [100, 79, 80, 81, 80, 80, 70, 90, 90], label: '출석율'}
  ];
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatPagePage');
  }

}
