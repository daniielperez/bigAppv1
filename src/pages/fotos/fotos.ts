import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PerfilPage } from '../perfil/perfil';

/**
 * Generated class for the FotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fotos',
  templateUrl: 'fotos.html',
})
export class FotosPage {
  usuario:any;
  params = {
    tipo:"",
    usuario: window.localStorage.getItem('username'),
  }

  imageURI:any; 
  imageFileName:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  
  ) {
    this.usuario = this.navParams.get('usuario');
  }

  ionViewDidLoad() {
  }

  
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {},
    }

    options.params = this.params
  
    fileTransfer.upload(this.imageURI, "http://192.168.1.61/bigApp/bigApp/web/api/usuario/fotosperfil", options)
      .then((data) => {
      loader.dismiss();
      
      this.presentToast("Se Subio la imagen correctamente");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });

    

  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();

    this.navCtrl.push(PerfilPage,{
    });
  }

}
