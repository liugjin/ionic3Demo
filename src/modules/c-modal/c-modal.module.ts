import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CModalPage } from './c-modal';

@NgModule({
  declarations: [
    CModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CModalPage),
  ],
})
export class CModalPageModule {}
