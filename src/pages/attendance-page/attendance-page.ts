import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StatPage } from '../stat-page/stat-page';
import { AttendDetailPage } from '../attend-detail-page/attend-detail-page';
/*
  Generated class for the AttendancePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-attendance-page',
  templateUrl: 'attendance-page.html'
})
export class AttendancePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePagePage');
  }

  switchDetailPage() {
    this.navCtrl.push(AttendDetailPage, null, {animate: false});
  }
  switchStatPage() {
     this.navCtrl.push(StatPage, null, {animate: false});
   }

}
