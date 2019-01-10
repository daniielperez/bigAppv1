import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { PublicacionService } from '../../services/publicacionService';

/**
 * Generated class for the PostVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-video',
  templateUrl: 'post-video.html',
})
export class PostVideoPage {

  params = {
    contenido:"",
    urlYoutube: "",
    usuarioEmisor: window.localStorage.getItem('username'),
    usuarioReceptor:""
  }
  usuario:any;
  errorMessage;

  constructor(public _PublicacionService:PublicacionService,public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
    this.usuario = this.navParams.get('usuario');
    this.params.usuarioReceptor = this.usuario.username;
  }

  ionViewDidLoad() {
  }

  enviar(){
    this._PublicacionService.postVideoAction(this.params).subscribe(
      response => {
        
      }, 
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            if (this.errorMessage.statusText == 'Bad Request') {
              }
        }
      }
  );
  setTimeout(() => {
    this.navCtrl.push(PerfilPage,{
    });
   }, 1000);
  
  }

  

}
