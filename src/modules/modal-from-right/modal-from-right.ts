import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalFromRightPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-from-right',
  templateUrl: 'modal-from-right.html',
})
export class ModalFromRightPage {

  constructor(public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
