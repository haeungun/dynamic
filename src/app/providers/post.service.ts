import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Post } from '../model/post.model';

@Injectable()
export class PostService {
    private behaviorSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(null);
    
    constructor(private af: AngularFire, private http: Http) {}

    getPosts() {
        return this.af.database.list('/posts', {
                    query: {
                        orderByChild: 'createDate'
                    }
                }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    }

    getPostByKey(postKey) {
        let post = new Post();
        this.af.database.object('/posts/' + postKey).subscribe(list => {
            post.title = list.title;
            post.body = list.body;
            post.author = list.author;
            post.createDate = list.createDate;
            post.likeCount = list.likeCount;
        });
        return post;
    }

    getComments(postKey) {
        return this.af.database.list('/posts/' + postKey + '/comments/');
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
        return this.af.database.list('/posts/' + postKey + '/comments/')
                .push({
                    auth: user,
                    text: text,
                    createDate: firebase.database.ServerValue.TIMESTAMP
                });
    }

    writePost(title, body, user) {
        return this.af.database.list('/posts/')
                .push({
                    "author": user.name,
                    "uid": user.uid,
                    "createDate": firebase.database.ServerValue.TIMESTAMP,
                    title,
                    body
                })
    }

    modifyPost(postKey, title, body) {
        return this.af.database.object('/posts/' + postKey)
                .update({
                    title, 
                    body
                })
    }

    deletePost(postKey) {
        return this.af.database.list('/posts/' + postKey).remove();
    }

    addLikedUser(postKey, uid, name) {
        return this.af.database.object('/posts/' + postKey +'/likedUser/' + uid)
                .set({
                    "name": name
                })
    }


    likeList(postKey) {
        return this.af.database.list('/posts/' + postKey + '/likedUser');
    }

}