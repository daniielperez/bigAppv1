import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PerfilPage } from '../perfil/perfil';

/**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {
  usuario:any;
  params = {
    contenido:"",
    emisor: window.localStorage.getItem('username'),
    receptor: ""
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
    this.params.receptor = this.usuario.username;
    console.log(this.usuario.username);
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
  
    fileTransfer.upload(this.imageURI, "http://192.168.1.68/bigApp/bigApp/web/api/publicacion/imagen", options)
      .then((data) => {
      console.log(data);
      this.imageFileName = "http://192.168.1.68/bigApp/bigApp/web/uploads/empresa/imagen/"
     
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
