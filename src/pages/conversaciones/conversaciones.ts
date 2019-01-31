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
  conversaciones:any = false;
  errorMessage:any;
  spiner:any = false;

  toUser : {
    conversacionId: string,
    toUserName:string
    toUserNombre:string,
    toUserFoto:string,
    oneSignalId:string,
  };

  constructor(public navCtrl: NavController,public _ChatUsuarioService: ChatUsuarioService) {
    let parametros = {'username':window.localStorage.getItem('username')};
      this._ChatUsuarioService.ChatUsuarioAction(parametros).subscribe(
        response => {
            this.conversaciones=response.conversaciones;
            this.spiner = true;
            console.log(this.conversaciones);
        }, 
        error => {
            this.errorMessage = <any>error;
            if(this.errorMessage != null){
              alert(this.errorMessage);
          }
        }
    );
    
  }
  goToChat(conversacion){
    this.toUser = {
      conversacionId:conversacion.conversacionId,
      toUserName:conversacion.username,
      toUserNombre:conversacion.nombre,
      toUserFoto:conversacion.foto,
      oneSignalId:conversacion.oneSignalId,
    }
    console.log(this.toUser); 
    if (!conversacion) conversacion = {};
    this.navCtrl.push(ChatPage, this.toUser);
  }goToContactos(params){
    if (!params) params = {};
    this.navCtrl.push(ContactosPage);
  }
}
