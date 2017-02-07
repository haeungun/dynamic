import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class VerseService {

    constructor(private af: AngularFire) {}

    getVerse() {
        let number = Math.floor(Math.random() * 11);
        console.log(number);
        return this.af.database.object('/verse/' + number, {preserveSnapshot: true});
        // get between  0 and 10
    }
}