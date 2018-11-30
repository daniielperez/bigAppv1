import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { ContactosPage } from '../contactos/contactos';

@Component({
  selector: 'page-conversaciones',
  templateUrl: 'conversaciones.html'
})
export class ConversacionesPage {

  constructor(public navCtrl: NavController) {
  }
  goToChat(params){
    if (!params) params = {};
    this.navCtrl.push(ChatPage);
  }goToContactos(params){
    if (!params) params = {};
    this.navCtrl.push(ContactosPage);
  }
}
