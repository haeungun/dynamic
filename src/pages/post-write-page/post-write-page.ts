import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { FirebaseAuth, AngularFire,FirebaseObjectObservable } from 'angularfire2';

import { PostService } from '../../app/providers/post.service';
import { UserService } from '../../app/providers/user.service';

import { DocumentPage } from '../document-page/document-page';
import { Post } from '../../app/model/post.model';
import { User } from '../../app/model/user.model';
/*
  Generated class for the PostWritePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-post-write-page',
  templateUrl: 'post-write-page.html',
  providers: [ PostService ]
})
export class PostWritePage {

  postObservable: FirebaseObjectObservable<Post>;
  postKey: string;
  title: string;
  body: string;
  simpleMde: any;
  user: User;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private postService: PostService,
              private userService: UserService,
              private af: AngularFire,
              public auth: FirebaseAuth) {
                this.user = new User();
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostWritePagePage');
    this.user.name = this.userService.getUserName();
    this.user.uid = this.userService.getUserUid();
    // this.setUser();
  }
  /*
  setUser() {
    let current = this;
    this.af.auth.subscribe(auth => {
      this.af.database.object('/users/' + auth.uid).subscribe(info => {
        this.user.uid = info.uid;
        this.user.name = info.name;
      });
    });
    
  }
  */
  onWritePost() {
    if (!this.title || !this.body) {
      let prompt = this.alertCtrl.create({
        subTitle: '제목과 내용을 입력해주세요.',
        buttons: ['OK']
      });
      prompt.present();
      return;
    } 
    this.postService.writePost(this.title, this.body, this.user)
      .then(() => {
        let prompt = this.alertCtrl.create({
          subTitle: '작성이 완료되었습니다.',
          buttons: ['OK']
        });
        prompt.present();
        this.navCtrl.pop();
      })
  }
}
