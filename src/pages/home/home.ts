import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, Modal, Tabs, LoadingController } from 'ionic-angular';
import { Actionsheet2controllerProvider } from 'ionic-actionsheet2';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {
  feeds: string[];
  errorMessage: any;
  public mds: Modal;
  public showModal: boolean = false;
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public act2controller: Actionsheet2controllerProvider,
    public loadingCtrl: LoadingController,
    public rest: RestProvider) {
    super()
  }

  ionViewDidLoad() {
    this.getFeeds();
  }

  gotoQuestion() {
    let modal = this.modalCtrl.create("QuestionPage");
    modal.present();
  }

  gotoChat() {
    this.selectTab(2);
  }

  /**选定指定的tab
   * 
   * @param index 
   */
  selectTab(index: number) {
    let t: Tabs = this.navCtrl.parent;
    t.select(index);
  }

  getFeeds() {
    let loading = super.showLoading(this.loadingCtrl, "加载中...");
    this.rest.getFeeds()
      .subscribe(
        f => {
          this.feeds = f;
          loading.dismiss();
        },
        error => this.errorMessage = <any>error
      )
  }

  gotoDetails(questionID) {
    this.navCtrl.push("DetailsPage", { id: questionID })
  }



  // openModal() {
  //   this.mds = this.modalCtrl.create("CModalPage", {
  //     navigationDockId: 1
  //   }, {
  //       showBackdrop: true,
  //       enableBackdropDismiss: true,
  //       enterAnimation: 'modal-from-bottom-enter',
  //       leaveAnimation: 'modal-from-bottom-leave'
  //     });
  //   this.mds.onDidDismiss(data => {
  //     this.showModal = false;
  //   });
  //   this.mds.present().then(data => {
  //     this.showModal = true;
  //   });
  // }

  // openModalFromRight() {
  //   this.mds = this.modalCtrl.create("ModalFromRightPage", {
  //     navigationDockId: 1
  //   }, {
  //       showBackdrop: true,
  //       enableBackdropDismiss: true,
  //       enterAnimation: 'modal-from-right-enter',
  //       leaveAnimation: 'modal-from-right-leave'
  //     });
  //   this.mds.onDidDismiss(data => {
  //     this.showModal = false;
  //   });
  //   this.mds.present().then(data => {
  //     this.showModal = true;
  //   });
  // }

  // openModalMenuFromRight() {
  //   if (this.mds && this.showModal) {
  //     this.mds.dismiss();
  //   } else {
  //     this.openModalFromRight();
  //   }
  // }

  // openModalMenu() {
  //   if (this.mds && this.showModal) {
  //     this.mds.dismiss();
  //   } else {
  //     this.openModal();
  //   }
  // }

  // alloylever() {
  //   this.navCtrl.push("AllowleverDemoPage");
  // }

  // share() {
  //   this.act2controller.create({
  //     buttons: [
  //       {
  //         text: '微信',
  //         imgurl: "assets/imgs/weixinpic.png",
  //         handler: () => {
  //           console.log('1');
  //         },
  //       },
  //       {
  //         text: '微信朋友圈',
  //         imgurl: "assets/imgs/weixinzone.png",
  //         handler: () => {
  //           console.log('2');
  //         },
  //       }, {
  //         text: 'qq',
  //         imgurl: "assets/imgs/qq.png",
  //         handler: () => {
  //           console.log('3');
  //         }
  //       }
  //       , {
  //         text: 'qq空间',
  //         imgurl: "assets/imgs/qqzone.png",
  //         handler: () => {
  //           console.log('3');
  //         }
  //       },
  //     ],
  //   })
  // }

  // fingerprint() {
  //   this.navCtrl.push('FingerprintPage');
  // }

  // calendar() {
  //   this.navCtrl.push("CalendarDemoPage");
  // }
}
