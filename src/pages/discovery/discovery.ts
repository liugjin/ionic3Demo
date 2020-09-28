import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController } from 'ionic-angular';
import { Actionsheet2controllerProvider } from 'ionic-actionsheet2';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';


@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI {
  questions: string[];
  errorMessage: any;
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public act2controller: Actionsheet2controllerProvider,
    public loadingCtrl: LoadingController,
    public rest: RestProvider) {
    super()
  }

  ionViewDidLoad() {
    this.getQuestions();
  }

  getQuestions() {
    let loading = super.showLoading(this.loadingCtrl, "加载中...");
    this.rest.getQuestions()
      .subscribe(
        q => {
          this.questions = q;
          loading.dismiss();
        },
        error => this.errorMessage = <any>error
      )
  }

}
