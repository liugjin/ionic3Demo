import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Config } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
/**
 * 导入Modal 动画库
 */
import { ModalFromLeftEnter, ModalFromLeftLeave, ModalFromRightEnter, ModalFromRightLeave, ModalFromTopEnter, ModalFromTopLeave, ModalFromBottomEnter, ModalFromBottomLeave, ModalScaleEnter, ModalScaleLeave } from './modal-transitions';
/**
 * 导入4个外部加载的组件
 * 安装方法
 * npm install --save @ionic-native/camera @ionic-native/file @ionic-native/file-path @ionic-native/transfer
 * ionic cordova plugin add cordova-plugin-camera --save
 * ionic cordova plugin add cordova-plugin-file --save
 * ionic cordova plugin add cordova-plugin-file-transfer --save
 * ionic cordova plugin add cordova-plugin-filepath --save
 */
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { TabsPage } from '../pages/tabs/tabs';
import { ActionSheet2Module } from 'ionic-actionsheet2';
import { CalendarModule } from 'ion2-calendar';
@NgModule({
  declarations: [
    MyApp,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule, //全局需要导入 HTTP
    ActionSheet2Module,//全局导入分享组件
    CalendarModule,//全局导入日期组件
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
    }),
    IonicStorageModule.forRoot() //全局定义 storage 的模块
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider, //rest 的定义导入
    File,
    Transfer,
    FilePath,
    Camera,
    FingerprintAIO,
  ]
})
export class AppModule {
  constructor(public config: Config) {
    this.setCustomTransitions();
  }
  private setCustomTransitions() {
    /**
     * 定义调用Modal 的过渡方式
     */
    this.config.setTransition('modal-from-left-enter', ModalFromLeftEnter);
    this.config.setTransition('modal-from-left-leave', ModalFromLeftLeave);
    this.config.setTransition('modal-from-right-enter', ModalFromRightEnter);
    this.config.setTransition('modal-from-right-leave', ModalFromRightLeave);
    this.config.setTransition('modal-from-top-enter', ModalFromTopEnter);
    this.config.setTransition('modal-from-top-leave', ModalFromTopLeave);
    this.config.setTransition('modal-from-bottom-enter', ModalFromBottomEnter);
    this.config.setTransition('modal-from-bottom-leave', ModalFromBottomLeave);
    this.config.setTransition('modal-scale-enter', ModalScaleEnter);
    this.config.setTransition('modal-scale-leave', ModalScaleLeave);
  }
}
