import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/*
  Generated class for the AttendDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-attend-detail-page',
  templateUrl: 'attend-detail-page.html'
})
export class AttendDetailPage {


  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  addStudent() {
    console.log('Add!');
  }

}
