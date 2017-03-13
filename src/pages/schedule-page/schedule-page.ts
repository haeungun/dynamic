import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Schedule } from '../../app/model/schedule.model';
import { ScheduleService } from '../../app/providers/schedule.service';
import { UserService } from '../../app/providers/user.service';

/*
  Generated class for the SchedulePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-schedule-page',
  templateUrl: 'schedule-page.html',
  providers: [ ScheduleService, UserService ]
})

export class SchedulePage {
  slideOption = {
      loop: true    
  }
  currentSlide = 0;

  @Input() 
  schedule = new String();
  events: FirebaseListObservable<any>;
  month: Array<number>;
  current: Date;
  today: Date;
  wHeadShort: string[] = ['일', '월', '화', '수', '목', '금', '토'];
  wHeadMed: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  previousDay: any;
  selectedDay: any;
  selectedDate: Date;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public af: AngularFire,
              private alertCtrl: AlertController,
              private scheduleService: ScheduleService,
              private userService: UserService) {
                this.today = navParams.get("today");
                this.current = new Date();
                this.selectedDate = new Date();
                this.events = scheduleService.getEvents(this.today);
            }

  ionViewDidLoad() {
    this.current.setTime(this.today.getTime());
    this.monthRender(this.today.toISOString());
  }

  isToday(day) {
    if (this.today.getDate() === day.getDate() && 
        this.today.getMonth() === day.getMonth()) {
      return true;      
    } else {
      return false;        
    }
  }

  diffMonth(day) {
    if (this.current.getMonth() !== day.getMonth()) {
      return true;
    } else {
      return false;
    }
  }

  toDate(day) {
    return day.getDate();
  }

  monthRender(date: string) {
    console.log("DATE: " + date);
    let sDate = new Date(date);
    this.today = sDate;
    var month = new Array();
    var firstDay = new Date(date);
    this.today = firstDay;
    firstDay.setDate(1);
    var firstDayNextMonth = new Date(date);        
    if (firstDay.getMonth() < 10) {
      firstDayNextMonth.setMonth(firstDay.getMonth() + 1);
      firstDayNextMonth.setDate(1);
    } else {
      firstDayNextMonth.setMonth(0);
      firstDayNextMonth.setDate(1);
    }
    var lastDay = new Date(date);
    lastDay.setTime(firstDayNextMonth.getTime() - (1 * 24 * 3600000));
    var iw = firstDay.getDay();
    var dayCount = 0;
    // build week in month
    for (let i = 0; i <= 5; i++) {
      var weekDay = new Array();
      for (var j = 0; j <= 6; j++) {
        if (i === 0 && j < iw) {
          // previous month date
          var day = new Date();
          day.setTime(firstDay.getTime() - ((iw - j) * 24 * 3600000));
          weekDay.push(day);
        } else {
          if (dayCount < lastDay.getDate()) {
            var day = new Date();
            day.setTime(firstDay.getTime() + (dayCount * 24 * 3600000));
            if (this.today.getDate() === day.getDate() && this.today.getMonth() === day.getMonth()) {
              let oDay = day;
              weekDay.push(oDay);
              this.selectedDay = oDay;
            } else {
              weekDay.push(day);
            }
            dayCount++;
          } else {
            // next month date
            dayCount++;
            var day = new Date();
            day.setTime(lastDay.getTime() + ((dayCount - lastDay.getDate()) * 24 * 3600000));
            weekDay.push(day);
          }
        }
      }
      month.push(weekDay);
    }
    this.month = month;
  }

  previousMonth() {
    let previous = new Date();
    let currentMonth = this.current.getMonth();
    if (currentMonth > 0) {
      previous.setMonth(currentMonth - 1);     
    } else {
      previous.setMonth(11);
      previous.setFullYear(this.current.getFullYear() - 1);
    }
    this.current = new Date();
    this.current.setTime(previous.getTime());
    this.monthRender(this.current.toISOString());
  }

  nextMonth() {
    let next = new Date();
    let currentMonth = this.current.getMonth();
    if (currentMonth < 11) {
      next.setMonth(currentMonth + 1);
    } else {
      next.setMonth(0);
      next.setFullYear(this.current.getFullYear() + 1);
    }
    this.current = new Date();
    this.current.setTime(next.getTime());
    this.monthRender(this.current.toISOString());
  }

  selectDate(day) {
    console.log(day);
    this.selectedDate = day;
    this.navCtrl.insert(this.navCtrl.length() - 1, SchedulePage, {today: day}).then( () => {
      this.navCtrl.pop({animate: false});
    });
  }

  addEvent(today) {
    // Check access right.
    // If user is student, he can't add event.
    let role = this.userService.getUserRole();
    if (role === 's') {
      let prompt = this.alertCtrl.create({
        subTitle: '접근 권한이 없습니다!',
        buttons: ['OK']
      })
      prompt.present();
      return;
    }
    if (this.schedule.length > 0) {
      this.scheduleService.createEvent(today, this.schedule).then(_ => this.schedule = "");
    } else {
      let prompt = this.alertCtrl.create({
        subTitle: '일정을 입력하세요.',
        buttons: ['OK']
      });
      prompt.present();
    }
  }

  removeEvent(event, today) {
    let role = this.userService.getUserRole();
    if (role === 's') {
      let prompt = this.alertCtrl.create({
        subTitle: '접근 권한이 없습니다!',
        buttons: ['OK']
      })
      prompt.present();
      return;
    }
    this.scheduleService.deleteEvent(event.$key, today);
  }

}
