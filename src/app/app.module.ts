import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login-page/login-page';
import { SignUpPage} from '../pages/signup-page/signup-page';
import { MainPage} from '../pages/main-page/main-page';
import { DocumentPage } from '../pages/document-page/document-page';
import { PostWritePage } from '../pages/post-write-page/post-write-page';
import { AttendancePage } from '../pages/attendance-page/attendance-page';
import { SchedulePage } from '../pages/schedule-page/schedule-page';
import { NoticePage } from '../pages/notice-page/notice-page';
import { PhotoPage } from '../pages/photo-page/photo-page';
import { StatPage } from '../pages/stat-page/stat-page';
import { PostDetailPage } from '../pages/post-detail-page/post-detail-page';
import { AttendDetailPage } from '../pages/attend-detail-page/attend-detail-page';

import { AngularFireModule } from 'angularfire2';

import { ChartsModule } from 'ng2-charts';

export const firebaseConfig = {
    apiKey: "AIzaSyCHAHG7LE-PAvNJbhUPagJFuThDtdYZxAc",
    authDomain: "church-3560e.firebaseapp.com",
    databaseURL: "https://church-3560e.firebaseio.com",
    storageBucket: "church-3560e.appspot.com",
    messagingSenderId: "140151809213"
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    MainPage,
    DocumentPage,
    PostWritePage,
    AttendancePage,
    SchedulePage,
    NoticePage,
    PhotoPage,
    StatPage,
    PostDetailPage,
    AttendDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    MainPage,
    DocumentPage,
    PostWritePage,
    AttendancePage,
    SchedulePage,
    NoticePage,
    PhotoPage,
    StatPage,
    PostDetailPage,
    AttendDetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})

export class AppModule {}
