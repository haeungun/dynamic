import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Student } from '../model/student.model';

@Injectable()
export class StudentService {

    constructor(public af: AngularFire) {}

    creatStudent(name, school, sex, tel) {
        let student = new Student(name, school, sex, tel);
        return this.af.database.list('/students/' + school).push(student);
    }

    deleteStudent() {

    }
}