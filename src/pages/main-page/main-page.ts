import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DocumentPage } from '../document-page/document-page';
import { AttendancePage } from '../attendance-page/attendance-page';
import { SchedulePage } from '../schedule-page/schedule-page';
import { NoticePage } from '../notice-page/notice-page';
import { PhotoPage } from '../photo-page/photo-page';

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

  switchDocumentPage() {
    this.navCtrl.push(DocumentPage, null, {animate: false});
  }

  switchAttendancePage() {
    this.navCtrl.push(AttendancePage, null, {animate: false});
  }

  switchSchedulePage() {
    this.navCtrl.push(SchedulePage, null, {animate: false});
  }

  switchNoticePage() {
    this.navCtrl.push(NoticePage, null, {animate: false});
  }

  switchPhotoPage() {
    this.navCtrl.push(PhotoPage, null, {animate: false});
  }
}
