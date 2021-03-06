import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { BigAppPage } from '../big-app/big-app';
import { UsuarioService } from '../../services/usuarioService';
import { LoadingController } from 'ionic-angular';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../../config';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  usuario = {
    grant_type:'password',
    client_id: '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
    client_secret:'4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k', 
    username: '', 
    password: ''};
    errorMessage:any;

  public datos={
    username:''
  };

  constructor(
    public navCtrl: NavController,
    public _UsuarioService: UsuarioService,
    public loadingCtrl: LoadingController,
    private oneSignal: OneSignal,
    public alertCtrl: AlertController
  ) {
  }
  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }

  onLogin(){
  let loader = this.loadingCtrl.create({
    content: "Validando Datos...",
  });
  loader.present();
  this._UsuarioService.loginAction(this.usuario).subscribe(
      response => {
          console.log(response);
          localStorage.setItem('username', this.usuario.username);
          localStorage.setItem('token', response.access_token);
          if (isCordovaAvailable()){
            this.oneSignal.startInit(oneSignalAppId, sender_id);
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
            this.oneSignal.endInit();
            this.oneSignal.getIds().then((id) => { 
              let datos={
                'username': this.usuario.username, 
                'playerId': id.userId 
              }
              console.log(id.userId ); 
              this._UsuarioService.SetPlayerIdAction(datos).subscribe(
                response => {
                   
                }, 
                error => {
                    this.errorMessage = <any>error;
                    if(this.errorMessage != null){
                      alert(this.errorMessage);
                  }
                }
              );
            });
          }
          this.navCtrl.setRoot(BigAppPage);
          loader.dismiss();
      }, 
      error => {
        loader.dismiss();
        this.showAlert();
        
      }
  );
  this.datos.username = this.usuario.username;
  this._UsuarioService.UsuarioAction(this.datos).subscribe(
        response => {
          localStorage.setItem('fotoPerfil', response.usuario.fotoPerfil);
          localStorage.setItem('fotoPortada', response.usuario.fotoPortada);
          localStorage.setItem('nombres', response.usuario.nombres);
          localStorage.setItem('oneSignalId', response.usuario.oneSignalId);
          localStorage.setItem('empresaId', response.usuario.empresaId);
          // alert(response.usuario.empresaId); 
        }, 
        error => {
            this.errorMessage = <any>error;
            if(this.errorMessage != null){
              if (this.errorMessage.statusText == 'Bad Request') {
                }
          }
        }
    );
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Credenciales Incorrectas!',
      subTitle: 'La combinacion de usuario y contraseña  son incorrectas!!',
      buttons: ['OK']
    });
    alert.present();
  }
}
