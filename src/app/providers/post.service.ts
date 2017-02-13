import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Post } from '../model/post.model';
import { User } from '../model/user.model';

@Injectable()
export class PostService {
    private behaviorSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(null);

    constructor(private af: AngularFire) {}

    getPosts() {
        return this.af.database.list('/posts',{
                query: {
                    orderByChild: 'createDate'
                }
                }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    }

    getPost(postKey) {
        return this.af.database.object('/posts/' +postKey);
    }

    getComments(postKey) {
        return this.af.database.list('/post-comments/' + postKey);
    }

    getPrevPost(postKey) {
        return this.af.database.list('posts', {
                query: {
                    orderByKey: true,
                    stsrtAt: postKey,
                    limitToFirst: 2
                }
                }).map(posts => posts[1])
    }

    getNextPost(postKey) {
        return this.af.database.list('posts', {
                query: {
                    orderByKey: true,
                    endAt: postKey,
                    limitToLast: 2
                }
                }).map(posts => posts[0])
    }

    writeComment(postKey, text, user) {
        return this.af.database.list('/post-comments/' + postKey)
                .push({
                    author: user.name,
                    text: text,
                    uid: user.uid,
                    createDate: firebase.database.ServerValue.TIMESTAMP
                });
    }

    writePost(title, body, user) {
        return this.af.database.list('/posts/')
                .push({
                    "author": user.name,
                    "uid": user.uid,
                    "createDate": firebase.database.ServerValue.TIMESTAMP,
                    "likeCount": 0,
                    title,
                    body
                })
    }

    modifyPost(postKey, title, body) {
        return this.af.database.object('/posts/${postKey}')
                .update({
                    title, 
                    body
                })
    }

    deletePost(postKey) {
        return this.af.database.list('/posts/${postKey}').remove();
    }
}