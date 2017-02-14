import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class VerseService {

    constructor(private af: AngularFire) {}

    getVerse() {
        let number = Math.floor(Math.random() * 11);
        return this.af.database.object('/verse/' + number, {preserveSnapshot: true});
        // get between  0 and 10
    }
}