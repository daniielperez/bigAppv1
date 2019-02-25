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
    rootPage:any = BigAppPage ;
    username = localStorage.getItem("username");
    fotoPerfil = localStorage.getItem("fotoPerfil");
    empresaId = localStorage.getItem("empresaId");

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private oneSignal: OneSignal,private _usuarioService:UsuarioService) {

    // let status bar overlay webview
    statusBar.overlaysWebView(true);
    
    // set status bar to white
    statusBar.backgroundColorByHexString('#ffffff');
    statusBar.styleBlackTranslucent();
    statusBar.show();
       
    if (this.username == null) {
      this.rootPage = LoginPage;
    }else{
      this.rootPage = BigAppPage;
    }
    this.rootPage = LoginPage;

    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if (isCordovaAvailable()){
      // this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
      this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
      this.oneSignal.endInit();
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
  }goToEmpresa(){
    this.navCtrl.setRoot(EmpresaPage, {
      idEmpresa: this.empresaId
    });
  }goToMapa(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MapaPage);
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
  }goToSubasta(tipoSubasta){
    if (!tipoSubasta) tipoSubasta = {};
    this.navCtrl.setRoot(SubastaPage, {
      tipoSubasta: tipoSubasta
    });
  }
  goToSocial(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SocialPage);
  }


  
  // private onPushReceived(payload: OSNotificationPayload) {
  //   alert('Push recevied:' + payload.additionalData.foo);
  // }
  
  private onPushOpened(payload: OSNotificationPayload) {
    if(payload.additionalData.tipo == 'subasta'){
      this.navCtrl.setRoot(SubastaPage, {
        tipoSubasta: 'subastaEmpresa'
      });
    }
    if (payload.additionalData.tipo == 'chat') {
        let toUser = payload.additionalData.params
        if (!toUser) toUser = {};
        this.navCtrl.setRoot(ChatPage, toUser);
    }
  }
  
}
