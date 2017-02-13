import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Schedule } from '../model/schedule.model';

@Injectable()
export class ScheduleService {
    private behaviorSubject: BehaviorSubject<Schedule[]> = new BehaviorSubject<Schedule[]>(null);
    auth;

    constructor(private af: AngularFire) {
        this.af.auth.subscribe(auth => {
            this.af.database.object('/users/' + auth.uid).subscribe(info => {
                this.auth = info.name;
            })
        })
    }
 
    getEvents(date) {
        let formatDate = this.dateFormat(date);
        this.af.auth
        console.log(formatDate);
        return this.af.database.list('/schedules/' + formatDate)
                .map((array) => array) as FirebaseListObservable<any[]>;;
    }

    createEvent(date, event) {
        let formatDate = this.dateFormat(date);
        let schedule = new Schedule(event, this.auth);
        return this.af.database.list('/schedules/' + formatDate)
                .push(schedule);
    }

    deleteEvent(date, event) {
        let formatDate = this.dateFormat(date);
        return this.af.database.list('/schedules/' + formatDate).subscribe(list => {
            list.forEach(ev => {
                if (ev.event === event) {
                    console.log(ev);
                }  
            })
        })
    }

    dateFormat(day) {
        let year = day.getFullYear();
        let month = day.getMonth() + 1;
        let date = day.getDate();
        return year + '' + month + '' + date;
    }
}

