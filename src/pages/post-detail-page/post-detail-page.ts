import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { PostService } from '../../app/providers/post.service';

import { Post } from '../../app/model/post.model'; 
/*
  Generated class for the PostDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-post-detail-page',
  templateUrl: 'post-detail-page.html',
  providers: [PostService]
})

export class PostDetailPage {

  post;
  postKey;
  myName;
  comment;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public postService: PostService,
              private af: AngularFire) {
                this.post = new Post();
                this.postKey = navParams.get('postKey');
  }

  ionViewDidLoad() {
    this.setMyName();
    this.showComments();
    this.post = this.postService.getPostByKey(this.postKey);
  }

  addLike() {

  }

  addComment() {
    this.postService.writeComment(this.postKey, this.comment, this.myName);
    console.log(this.comment);
    this.comment = '';
  }

  removePost() {
    this.postService.deletePost(this.postKey);
  }

  setMyName() {
    this.af.auth.subscribe(auth => {       
      this.af.database.object('/users/' + auth.uid).subscribe(info => {
              this.myName = info.name;
      })
    })
  }

  showComments() {
    this.postService.getComments(this.postKey).subscribe(list => {
      console.log(list);
    });
  }
}
