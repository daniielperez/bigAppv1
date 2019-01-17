import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar'; 
import { SplashScreen } from '@ionic-native/splash-screen';

import { MunicipiosPage } from '../pages/municipios/municipios';
import { EmpresasPage } from '../pages/empresas/empresas';
import { EmpresaPage } from '../pages/empresa/empresa';
import { MapaPage } from '../pages/mapa/mapa';
import { ChatPage } from '../pages/chat/chat';
import { SubastaPage } from '../pages/subasta/subasta';
import { ConversacionesPage } from '../pages/conversaciones/conversaciones';
import { ContactosPage } from '../pages/contactos/contactos';
import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { SocialPage } from '../pages/social/social';
import { ComentariosPage } from '../pages/comentarios/comentarios';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../config';
import { UsuarioService } from '../services/usuarioService'; 


import { BigAppPage } from '../pages/big-app/big-app';


 
@Component({
  templateUrl: 'app.html',
  providers: [
    UsuarioService
  ],
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = BigAppPage;
    errorMessage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private oneSignal: OneSignal,private _usuarioService:UsuarioService) {

    // let status bar overlay webview
    statusBar.overlaysWebView(true);


    // set status bar to white
    statusBar.backgroundColorByHexString('#ffffff');
    statusBar.styleBlackTranslucent();
    statusBar.show();
    
    if (window.localStorage.getItem('username') == null) {
      this.rootPage = LoginPage;
    }else{
      this.rootPage = BigAppPage;
    }

    // this.rootPage = SocialPage;
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if (isCordovaAvailable()){
      this.oneSignal.startInit(oneSignalAppId, sender_id);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
      this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
      this.oneSignal.endInit();
      this.oneSignal.getIds().then((id) => {
        let datos={
          'username': window.localStorage.getItem('username'),
          'playerId': id.userId
        }
        this._usuarioService.SetPlayerIdAction(datos).subscribe(
          response => {
              console.log(response);
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
  } 
  goToBigApp(params){ 
    if (!params) params = {};
    this.navCtrl.setRoot(BigAppPage);
  }goToMunicipios(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MunicipiosPage);
  }goToEmpresas(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EmpresasPage);
  }goToEmpresa(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EmpresaPage);
  }goToMapa(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MapaPage);
  }goToChat(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ChatPage);
  }goToConversaciones(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ConversacionesPage);
  }goToContactos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ContactosPage);
  }goToPerfil(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PerfilPage);
  }goToComentarios(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ComentariosPage);
  }goToSubasta(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SubastaPage);
  }
  goToSocial(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SocialPage);
  }
  
  
  private onPushReceived(payload: OSNotificationPayload) {
    alert('Push recevied:' + payload.body);
  }
  
  private onPushOpened(payload: OSNotificationPayload) {
    alert('Push opened: ' + payload.body);
  }
 

  
}
