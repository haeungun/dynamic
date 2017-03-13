import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import { PostService } from '../../app/providers/post.service';

import { PostWritePage } from '../post-write-page/post-write-page';
import { PostDetailPage } from '../post-detail-page/post-detail-page';

/*
  Generated class for the DocumentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post-page',
  templateUrl: 'post-page.html',
  providers: [ PostService ]
})
export class PostPage {
  
  posts: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private postService: PostService) {}

  ionViewDidLoad() {
    this.posts = this.postService.getPosts();
  }

  
  showPostDetail(post) {
    this.navCtrl.push(PostDetailPage, {postKey: post.$key}, {animate: false});
  }

  switchWritePage() {
    this.navCtrl.push(PostWritePage, null, {animate: false});
  }
}
