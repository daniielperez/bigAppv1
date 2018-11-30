import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmpresaPage } from '../empresa/empresa';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-empresas',
  templateUrl: 'empresas.html'
})
export class EmpresasPage {

  constructor(public navCtrl: NavController) {
  }
  goToEmpresa(params){
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
