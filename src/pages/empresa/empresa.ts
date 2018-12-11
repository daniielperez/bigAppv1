import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';



@Component({
  selector: 'page-empresa',
  templateUrl: 'empresa.html'
})

export class EmpresaPage {

  constructor(public navCtrl: NavController) {
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
