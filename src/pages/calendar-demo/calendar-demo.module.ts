import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarDemoPage } from './calendar-demo';
import { CalendarModal } from 'ion2-calendar';

@NgModule({
  declarations: [
    CalendarDemoPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarDemoPage),
  ],
})
export class CalendarDemoPageModule { }
