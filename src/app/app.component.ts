import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MunicipiosPage } from '../pages/municipios/municipios';
import { EmpresasPage } from '../pages/empresas/empresas';
import { EmpresaPage } from '../pages/empresa/empresa';
import { MapaPage } from '../pages/mapa/mapa';
import { ChatPage } from '../pages/chat/chat';
import { ConversacionesPage } from '../pages/conversaciones/conversaciones';
import { ContactosPage } from '../pages/contactos/contactos';
import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { ComentariosPage } from '../pages/comentarios/comentarios';


import { BigAppPage } from '../pages/big-app/big-app';


 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = PerfilPage ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
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
  }
}
