import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NoticeService {

    constructor(private af: AngularFire) {}

    getNotices() {
        return this.af.database.list('/notices', {
            query: {
                orderByChild: 'createDate'
            }
        }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    }

    getNoticeByKey(postKey) {

    }

    writeNotice(title, body, user) {
        return this.af.database.list('/notices/')
                .push({
                    "author": user.name,
                    "uid": user.uid,
                    "createDate": firebase.database.ServerValue.TIMESTAMP,
                    title,
                    body
                })
    }

    deleteNotice(postKey) {
        return this.af.database.list('/notices/' + postKey).remove();
    }
}