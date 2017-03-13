import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { PostService } from '../../app/providers/post.service';
import { UserService } from '../../app/providers/user.service';

import { Post } from '../../app/model/post.model'; 
/*
  Generated class for the PostDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-post-detail-page',
  templateUrl: 'post-detail-page.html',
  providers: [ PostService, UserService ]
})

export class PostDetailPage {
  uid;
  post;
  postKey;
  myName;
  comment;
  comments;
  likes;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public postService: PostService,
              private UserService: UserService,
              private af: AngularFire) {
                this.post = new Post();
                this.postKey = navParams.get('postKey');
  }

  ionViewDidLoad() {
    this.af.auth.subscribe(auth => {
      this.af.database.object('/users/' + auth.uid).subscribe(info => {
        this.myName = info.name;
      })
    })
    this.uid = this.UserService.getUserUid();
    this.post = this.postService.getPostByKey(this.postKey);
    this.comments = this.postService.getComments(this.postKey);
    this.likes = this.postService.likeList(this.postKey);
    this.showComment(this.postKey);
  }

  addLike() {
    this.postService.addLikedUser(this.postKey, this.uid, this.myName);
    // this.postService.addLikeUser(this.postKey);
  }

  addComment() {
    this.postService.writeComment(this.postKey, this.comment, this.myName);
    this.comment = '';
  }

  removePost() {
    this.postService.deletePost(this.postKey);
  }

  showComment(postKey) {
    this.comments = this.postService.getComments(postKey);
  }

  deleteComment() {
    /*
    if (this.uid === 's') {
      let prompt = this.alertCtrl.create({
        subTitle: '접근 권한이 없습니다!',
        buttons: ['OK']
      })
      prompt.present();
      return;
    }
    */
    console.log("지우자!!");
  }
}
