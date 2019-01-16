import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { ContactosPage } from '../contactos/contactos';
import { ChatUsuarioService } from '../../services/chatUsuarioService'
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";

@Component({
  selector: 'page-conversaciones',
  templateUrl: 'conversaciones.html',
  providers: [
    ChatUsuarioService,
  ],
})
export class ConversacionesPage {
  chats:any = false;
  errorMessage:any;

  toUser : {toUserId: string, toUserName: string};

  constructor(public navCtrl: NavController,public _ChatUsuarioService: ChatUsuarioService) {
    let parametros = {'username':window.localStorage.getItem('username')};
      this._ChatUsuarioService.ChatUsuarioAction(parametros).subscribe(
        response => {
            this.chats=response;
            console.log(this.chats);
        }, 
        error => {
            this.errorMessage = <any>error;
            if(this.errorMessage != null){
              alert(this.errorMessage);
          }
        }
    );
    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'Hancock'
    }
  }
  goToChat(params){
    if (!params) params = {};
    this.navCtrl.push(ChatPage, this.toUser);
  }goToContactos(params){
    if (!params) params = {};
    this.navCtrl.push(ContactosPage);
  }
}
