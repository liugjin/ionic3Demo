import { Component } from '@angular/core';
import { IonicPage, normalizeURL, NavController, NavParams, ActionSheetController, ModalController, LoadingController, Platform, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
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
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
declare let cordova: any;//导入第三方的库定义到TS项目中
@IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {
  userId: string;
  errorMessage: string;
  lastImage: string = null;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public transfer: Transfer,
    public file: File,
    public filePath: FilePath,
    public platform: Platform,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {
    super()
  }
  ionViewDidLoad() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userId = val;
      }
    })
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从图片库中选择',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '使用相机',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '取消',
          role: 'cancel'
        },
      ]
    })
    actionSheet.present();
  }

  /**
   * 获取图片
   * @param sourceType 
   */
  takePicture(sourceType) {
    //定义相机的一些参数
    let options = {
      quality: 100,//图片的质量
      sourceType: sourceType,
      saveToPhotoAlbum: false,//是否保存拍摄的照片到相册中去
      correctOrientation: true,//是否纠正拍摄的照片的方向
    };
    //获取图片的方法
    this.camera.getPicture(options).then((imagePath) => {
      //特别处理 android 平台的文件路径问题
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath).then(filePath => {//获取 android 平台下的真实路径
          //获取正确路径
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          //获取正确的文件名
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        })
      } else {
        //获取正确路径
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //获取正确的文件名
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      super.showToast(this.toastCtrl, '选择图片出现错误，请在App中操作或检查相关权限。');
    });
  }

  /**
   * 将获取到的图片或者相机拍摄到的图片进行一下另存为,用于后期的图片上传使用
   */
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      super.showToast(this.toastCtrl, '存储图片到本地图库出现错误。');
    });
  }

  /**
   * 为文件生成一个新的文件名
   */
  createFileName() {
    let d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';//拼接文件名
    return newFileName;
  }

  /**
   * 处理图片的路径为可以上传的路径
   * @param img 
   */
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return normalizeURL(cordova.file.dataDirectory + img); //normalizeURL 兼容ios11
    }
  }

  /**
   * 图片上传
   */
  uploadImage() {
    let url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
    let targetPath = this.pathForImage(this.lastImage);
    let filename = this.userId + '.jpg';//定义上传后的文件名
    //fileTransfer上传的参数
    let options = {
      filekey: 'file',
      fileName: filename,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { 'fileName': filename, 'userid': this.userId }
    }
    const fileTransfer: TransferObject = this.transfer.create();
    let loading = super.showLoading(this.loadingCtrl, '上传中...');
    //开始正式地上传.
    fileTransfer.upload(targetPath, url, options).then(data => {
      loading.dismiss();
      super.showToast(this.toastCtrl, '图片上传成功');
      //在用户看清弹窗提示后进行页面的关闭
      setTimeout(() => {
        this.viewCtrl.dismiss();
      }, 3000)
    }, err => {
      loading.dismiss();
      super.showToast(this.toastCtrl, '图片上传发生错误，请重试。');
    });
  }

}
