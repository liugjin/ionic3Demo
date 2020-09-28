import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';


@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {
  public notLogin: boolean = true;
  public logined: boolean = false;
  headface: string;
  userinfo: string[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage) {
    super()
  }

  showModal() {
    let modal = this.modalCtrl.create("LoginPage");
    //关闭后的回调:modal页面关闭后，刷新父页面的方法(父页面函数的回调);
    //modal 关闭后不会再触发 ionViewDidEnter 生命周期函数
    modal.onDidDismiss(() => {
      this.loadUserPage();
    });
    modal.present();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }
  /**
   * 获取用户信息
   */
  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      console.log(val);
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getUserInfo(val).subscribe(userinfo => {
          console.log(userinfo);
          this.userinfo = userinfo;
          //?号后面给资源文件添加一个后缀,去除缓存
          this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
          this.notLogin = false;
          this.logined = true;
          loading.dismiss();
        });
      }
      else {
        this.notLogin = true;
        this.logined = false;
      }
    });
  }

  goToUesrPage() {
    this.navCtrl.push("UesrPage");
  }
}
