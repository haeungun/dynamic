import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DocumentPage } from '../document-page/document-page';
import { AttendancePage } from '../attendance-page/attendance-page';
import { SchedulePage } from '../schedule-page/schedule-page';
import { NoticePage } from '../notice-page/notice-page';
import { PhotoPage } from '../photo-page/photo-page';

import { VerseService } from '../../app/providers/verse.service';

/*
  Generated class for the MainPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main-page',
  templateUrl: 'main-page.html',
  providers: [ VerseService ]
})

export class MainPage {

  verse;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private service: VerseService) {}

  ionViewDidLoad() {
    this.service.getVerse().subscribe(v => {
      this.verse = v.val();
    });
  }

  switchDocumentPage() {
    this.navCtrl.push(DocumentPage, null, {animate: false});
  }

  switchAttendancePage() {
    this.navCtrl.push(AttendancePage, null, {animate: false});
  }

  switchSchedulePage() {
    let day = new Date(); 
    this.navCtrl.push(SchedulePage, {today: day}, {animate: false});
  }

  switchNoticePage() {
    this.navCtrl.push(NoticePage, null, {animate: false});
  }

  switchPhotoPage() {
    this.navCtrl.push(PhotoPage, null, {animate: false});
  }
}
