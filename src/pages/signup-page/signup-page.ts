import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { FirebaseAuth, AuthProviders, AngularFire } from 'angularfire2';

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

  user = { email: '', password:'', name: '', birth: '', uid: '', tel:'', role: '', class: ''};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public auth: FirebaseAuth, 
              private alertCtrl: AlertController,
              private af: AngularFire) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPagePage');
  }

  registerUser() {
    this.auth.createUser(this.user).then((authData) => {
      this.user.uid = authData.uid;
      console.log(this.user);
      let users = this.af.database.object('/users/' + authData.uid);
      users.set({"name": this.user.name, 
                 "birth": this.user.birth, 
                 "tel": this.user.tel,
                 "uid": this.user.uid});

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

}
