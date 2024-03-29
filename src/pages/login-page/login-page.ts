import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFire, FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';

import { MainPage } from '../main-page/main-page';
import { SignUpPage } from '../signup-page/signup-page';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {

  user = { email: '', password: '' };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private auth: FirebaseAuth, 
              private alertCtrl: AlertController,
              private af: AngularFire) {
                this.af.auth.subscribe(auth => {
                  if(auth) {
                    this.navCtrl.setRoot(MainPage);
                  }
                });
              }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPagePage');
  }

  loginUser(){
    this.auth.login(this.user, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((authData) => {
      this.navCtrl.setRoot(MainPage);
    }).catch((error) => {
      this.showError(error);
    })
    
  }

  switchPage() {
    this.navCtrl.push(MainPage, null, {animate: false});
  }

  switchSignUpPage() {
    this.navCtrl.push(SignUpPage, null, {animate: false});
  }

  showError(text) {
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }

}
