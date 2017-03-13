import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { FirebaseAuth, AngularFire } from 'angularfire2';

import { LoginPage } from '../login-page/login-page';

/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup-page',
  templateUrl: 'signup-page.html',
})

export class SignUpPage {
  years: string[] = [];
  months: string[] = [];
  daies: string[] = [];
  user = { email: '', 
           password:'', 
           name: '', 
           birth: { year: '', month: '', day: '' }, 
           uid: '',
           sex: '',
           tel:'', 
           role: '', 
           school: '',
           grade: ''};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public auth: FirebaseAuth, 
              private alertCtrl: AlertController,
              private af: AngularFire) {
              }

  ionViewDidLoad() {
    this.setYear(this.years);
    this.setMonth(this.months);
    this.setDate(this.daies);
    console.log('ionViewDidLoad SignupPagePage');
  }
  
  registerUser() {
    this.auth.createUser(this.user).then((authData) => {
      this.user.uid = authData.uid;
      console.log(this.user);
      let users = this.af.database.object('/users/' + authData.uid);
      users.set({"email": this.user.email,
                 "name": this.user.name, 
                 "birth": this.user.birth, 
                 "tel": this.user.tel,
                 "uid": this.user.uid,
                 "role": this.user.role,
                 "sex": this.user.sex,
                 "school": this.user.school,
                 "grade": this.user.grade});

      let prompt=this.alertCtrl.create({
        title: 'Success',
        subTitle: 'Your new account was created!',
        buttons: ['OK']
      });
      prompt.present();
      this.navCtrl.push(LoginPage, null, {animate: false});
    }).catch((error) => {
      this.showError(error);
    });
  }

  showError(text) {
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }

  setYear(year) {
    for (let i = 2010; i > 1949; i --) {
      year.push(i);
    }
  }

  setMonth(month) {
    for (let i = 1; i < 13; i ++) {
      month.push(i);
    }
  }

  setDate(day) {
    for (let i = 1; i < 32; i ++) {
      day.push(i);
    }
  }
}