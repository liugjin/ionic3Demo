import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-uesr',
  templateUrl: 'uesr.html',
})
export class UesrPage extends BaseUI {
  headface: string = "http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg";
  nickname: string = "加载中...";
  errorMessage: any;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public storage: Storage) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UesrPage');
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      console.log(val);
      if (val != null) {
        let loading = super.showLoading(this.loadCtrl, '加载中...');
        this.rest.getUserInfo(val).subscribe(userinfo => {
          loading.dismiss();
          this.nickname = userinfo["UserNickName"];
          //?号后面给资源文件添加一个后缀,去除缓存
          this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
        }, error => this.errorMessage = <any>error);
      }
    });
  }
  // 修改用户头像
  gotoHeadface() {
    this.navCtrl.push("HeadfacePage");
  }
  /**
   * 对昵称进行保存提交
   */
  updateNickName() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadCtrl, "修改中...");
        this.rest.updateNickName(val, this.nickname).subscribe(
          f => {
            console.log(f);
            if (f["Status"] == "OK") {
              loading.dismiss();
              super.showToast(this.toastCtrl, "昵称修改成功。");
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f["StatusContent"]);
            }
          }, error => this.errorMessage = <any>error);
      }
    })
  }
  /**
   * 注销登录
   */
  logout() {
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }
}
