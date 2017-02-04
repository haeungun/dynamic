import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireModule, FirebaseAuth, AuthProviders, AuthMethods } from 'angularfire2';

/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup-page',
  templateUrl: 'signup-page.html'
})
export class SignUpPage {

  user={ email: '', password:'' };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public auth: FirebaseAuth, 
              private alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPagePage');
  }

  registerUser() {
    this.auth.createUser(this.user).then((authData) => {
      let prompt=this.alertCtrl.create({
        title: 'Success',
        subTitle: 'Your new account was created!',
        buttons: ['OK']
      });
      prompt.present();
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
