import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2';

import { NoticeService } from '../../app/providers/notice.service';

/*
  Generated class for the NoticePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notice-page',
  templateUrl: 'notice-page.html'
})
export class NoticePage {

  notices: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private noticeService: NoticeService) {}

  ionViewDidLoad() {
    this.notices = this.noticeService.getNotices();
    console.log('ionViewDidLoad NoticePagePage');
  }

  switchWritePage() {
    console.log("페이지 이동!");
    //this.navCtrl.push();
  }
}
