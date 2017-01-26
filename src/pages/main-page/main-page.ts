import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TimetablePage } from '../timetable-page/timetable-page';

/*
  Generated class for the MainPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main-page',
  templateUrl: 'main-page.html'
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPagePage');
  }

  switchTimetablePage(event){
    this.navCtrl.push(TimetablePage, null, {animate: false});
  }

}
