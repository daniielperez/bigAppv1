import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { AmigoService } from '../../services/amigoService';

@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html',
  providers: [
    AmigoService,
  ],
})
export class ContactosPage {
   amigos:any;
   spiner:any = false;
   errorMessage:any;
   toUser : {
    conversacionId: string,
    toUserName:string
    toUserNombre:string,
    toUserFoto:string,
    oneSignalId:string,
  };
  constructor(
    public navCtrl: NavController,
    public _amigoService:AmigoService
    ) {}

    ngOnInit(){
      let datos = {
        'username': window.localStorage.getItem('username')
      }
      this._amigoService.FindUsurioAmigos(datos).subscribe(
        response => {
          if(response.status ='success'){
              this.amigos=response.amigos;
              this.spiner = true;
              console.log(this.amigos);
            }
        },   
        error => { 
            this.errorMessage = <any>error;
            console.log(error);
          }
      );
    }

    

  goToChat(amigo){
    this.toUser = {
      conversacionId:amigo.conversacionId,
      toUserName:amigo.username,
      toUserNombre:amigo.nombre,
      toUserFoto:amigo.foto,
      oneSignalId:amigo.oneSignalId,
    }
    console.log(this.toUser); 
    if (!amigo) amigo = {};
    this.navCtrl.push(ChatPage, this.toUser);
  }
}
