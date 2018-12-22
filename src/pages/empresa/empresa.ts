import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';



@Component({
  selector: 'page-empresa',
  templateUrl: 'empresa.html'
})

export class EmpresaPage {
  idEmpresa:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.idEmpresa = this.navParams.get('idEmpresa');
    alert(this.idEmpresa);  
  }
  goToMapa(params){
    if (!params) params = {};
    this.navCtrl.push(MapaPage, {
      lat: 1.202510, 
      lng: -77.276977,
      nombre: 'hol'
    });
  }goToChat(params){
    if (!params) params = {};
    this.navCtrl.push(ChatPage);
  }   
}
