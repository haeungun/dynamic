import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FirebaseAuth, AngularFire,FirebaseObjectObservable } from "angularfire2";

import { PostService } from "../../app/providers/post.service";

import { DocumentPage } from '../document-page/document-page';
import { Post } from "../../app/model/post.model";
import { User } from "../../app/model/user.model";
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
              public postService: PostService,
              private af: AngularFire,
              public auth: FirebaseAuth) {
                this.user = new User();
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostWritePagePage');
    this.setUser();
  }

  setUser() {
    let current = this;
    this.af.auth.subscribe(auth => {
      this.af.database.object('/users/' + auth.uid).subscribe(info => {
        this.user.uid = info.uid;
        this.user.name = info.name;
        console.log(info.name);
        console.log(info.uid);
      });
    });
    
  }

  onWritePost() {
    console.log(this.user);
    
    if (!this.title || !this.body) {
      alert('제목과 내용을 입력해주세요.');
      return;
    } 
    this.postService.writePost(this.title, this.body, this.user)
    .then(() => {
      alert("작성 완료");
      this.navCtrl.pop();
  })
  
  }
}
