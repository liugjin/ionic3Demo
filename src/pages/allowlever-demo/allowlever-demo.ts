import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var AlloyLever;
@IonicPage()
@Component({
  selector: 'page-allowlever-demo',
  templateUrl: 'allowlever-demo.html',
})
export class AllowleverDemoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllowleverDemoPage');
  }
  ionViewDidEnter() {
    AlloyLever.entry('#entry');
  }

}
