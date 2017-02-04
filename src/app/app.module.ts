import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login-page/login-page';
import { SignUpPage} from '../pages/signup-page/signup-page';
import { MainPage} from '../pages/main-page/main-page';
import { TimetablePage } from '../pages/timetable-page/timetable-page';

import { AngularFireModule } from 'angularfire2';

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
    TimetablePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    MainPage,
    TimetablePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})

export class AppModule {}
