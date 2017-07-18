import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {IonicStorageModule} from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { NetworkProvider } from '../providers/network-provider';
import { AddAttendancePage } from '../pages/add-attendance/add-attendance';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AddAttendancePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AddAttendancePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    NetworkProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
