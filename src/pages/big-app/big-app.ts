import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MunicipiosPage } from '../municipios/municipios';
import { EmpresasPage } from '../empresas/empresas';
import { EmpresaPage } from '../empresa/empresa';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-big-app',
  templateUrl: 'big-app.html'
})
export class BigAppPage {

  constructor(public navCtrl: NavController) {
  }
  goToMunicipios(params){
    if (!params) params = {};
    this.navCtrl.push(MunicipiosPage);
  }goToEmpresas(params){
    if (!params) params = {};
    this.navCtrl.push(EmpresasPage);
  }goToEmpresa(params){
    if (!params) params = {};
    this.navCtrl.push(EmpresaPage);
  }goToMapa(params){
    if (!params) params = {};
    this.navCtrl.push(MapaPage);
  }goToChat(params){
    if (!params) params = {};
    this.navCtrl.push(ChatPage);
  }
}
