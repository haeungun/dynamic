import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    constructor(public af: AngularFire) {}

    getUserUid() {
        let uid;
        this.af.auth.subscribe(auth => {
            uid = auth.uid;
        })
        return uid;
    }

    getUserName() {
        let name;
        this.af.auth.subscribe(auth => {
            this.af.database.object('/users/' + auth.uid).subscribe(info => {
                name = info.name;
            })
        })
        return name;
    }

    
    getUserRole() {
        let role;
        this.af.auth.subscribe(auth => {
            this.af.database.object('/users/' + auth.uid).subscribe(info => {
                console.log(info);
                role = info.role;
            })
        })
        return role;
    }
   
    getUserTel() {
        let tel;
        this.af.auth.subscribe(auth => {
            this.af.database.object('/users/' + auth.uid).subscribe(info => {
                tel = info.tel;
            })
        })
        return tel;
    }

    getUserSex() {
        let sex;
        this.af.auth.subscribe(auth => {
            this.af.database.object('/users/' + auth.uid).subscribe(info => {
                sex = info.sex;
            })
        })
        return sex;
    }

    getUserSchool() {
        let school;
        this.af.auth.subscribe(auth => {
            this.af.database.object('/users/' + auth.uid).subscribe(info => {
                school = info.school;
            })
        })
        return school;
    }
}