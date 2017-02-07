import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import { PostService } from '../../app/providers/post.service';

import { PostWritePage } from '../post-write-page/post-write-page';

/*
  Generated class for the DocumentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-document-page',
  templateUrl: 'document-page.html',
  providers: [ PostService ]
})
export class DocumentPage {

  posts: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, postService: PostService) {
    this.posts = postService.getPosts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentPagePage');
  }

  showPost(post) {

  }

  switchWritePage() {
    this.navCtrl.push(PostWritePage, null, {animate: false});
  }
}
