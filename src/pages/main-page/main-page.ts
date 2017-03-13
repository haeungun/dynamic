import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

import { PostPage } from '../post-page/post-page';
import { AttendancePage } from '../attendance-page/attendance-page';
import { SchedulePage } from '../schedule-page/schedule-page';
import { NoticePage } from '../notice-page/notice-page';
import { PhotoPage } from '../photo-page/photo-page';
import { LoginPage } from '../login-page/login-page';

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
              private service: VerseService,
              private af: AngularFire) {
                this.af.auth.subscribe(auth => {
                  if(!auth) {
                    this.navCtrl.setRoot(LoginPage);
                  }
                });
              }

  ionViewDidLoad() {
    this.service.getVerse().subscribe(v => {
      this.verse = v.val();
    });
  }

  switchDocumentPage() {
    this.navCtrl.push(PostPage, null, {animate: false});
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

  logout() {
    this.af.auth.logout();
  }
}
