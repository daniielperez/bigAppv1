import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AmigoService } from '../../services/amigoService';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  datos = {
    'stringBusqueda':""
  }
  stringBusqueda:any;
  usuarios:any=null;
  user:any=null;
  busqueda:any=null;
  errorMessage:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public _amigoService:AmigoService,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public alertCtrl: AlertController) {
    const alert = this.alertCtrl.create({
      title: 'Noticia!',
      subTitle: 'Deslice hacia el lado izquiero y de click en agregar para tener contacto permanente con otro usuario Big Trade!',
      buttons: ['OK']
    });
    alert.present();
    let loader = this.loadingCtrl.create({
      content: "Agragando...",
    });
    loader.present();
    this._amigoService.IndexPagAction().subscribe(
      response => {
        if(response.status ='success'){
            this.usuarios = response.usuarios;
            loader.dismiss();
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }

  onFilltro(): void {
    console.log(this.datos.stringBusqueda);

    this._amigoService.FindAmigoUsurio(this.datos).subscribe(
      response => {
        if(response.status ='success'){
            this.usuarios=response.usuarios;
            console.log(this.usuarios);
          }
      },   
      error => { 
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }
  agregarAmigo(usuarioAmigo){
    let loader = this.loadingCtrl.create({
      content: "Agragando...",
    });
    loader.present();
    let data = {
      'usuario':window.localStorage.getItem("username"),
      'usuarioAmigo':usuarioAmigo.username
    }
    console.log(data);
    

    this._amigoService.NewAmigoAction(data).subscribe(
      response => {
        if(response.status ='success'){
            loader.dismiss();
            this.presentToast("Amigo agregado");
          }
      },   
      error => { 
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
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
  }
  
  


}
