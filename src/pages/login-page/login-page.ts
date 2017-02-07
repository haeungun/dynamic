import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireModule, FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';

import { User } from '../../app/model/user.model';
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
              public auth: FirebaseAuth, 
              private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPagePage');
  }

  loginUser(event){
    // console.log("login");
    this.switchPage();
    /*
    this.auth.login(this.user, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then((authData) => {
      this.navCtrl.setRoot(MainPage);
    }).catch((error) => {
      this.showError(error);
    })
    */
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
