import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Content, NavParams, Events } from 'ionic-angular';
import { ChatUsuarioService } from '../../services/chatUsuarioService';
import { NotificacionService } from '../../services/notificacionService';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [
    ChatUsuarioService,
    NotificacionService
  ],
})
export class ChatPage {
  
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  parametros: any;
  editorMsg = '';
  showEmojiPicker = false;
  errorMessage:any;
  myUsername:any;
  myFoto:any;
  myUserNames:any;
  chats:any=[];
  spiner:any = false;

  constructor(
    private events: Events,
    navParams: NavParams,
    public navCtrl: NavController,
    public _ChatUsuarioService: ChatUsuarioService,
    public _NotificacionService: NotificacionService,
    private oneSignal: OneSignal,
    ) {
      
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
    this.oneSignal.endInit();  

    this.myUsername = window.localStorage.getItem('username');
    this.myFoto = window.localStorage.getItem('fotoPerfil');
    this.myUserNames = window.localStorage.getItem('nombres');

    console.log(this.myUsername);
    
    // Get the navParams toUserId parameter
    this.parametros = {
      conversacionId: navParams.get('conversacionId'),
      toUserName: navParams.get('toUserName'),
      toUserFoto: navParams.get('toUserFoto'),
      toUserNombre: navParams.get('toUserNombre'),
      oneSignalId: navParams.get('oneSignalId'),
    };

    

  }

  ionViewDidEnter() {
    this.getMensajes();
  }

  ngOnInit(){
    setTimeout(() => {
      this.content.resize();
      this.ngOnInit();
    },1000)
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  
  /**
   * @name sendMsg
   */
  sendMsg() {
    const id = Date.now().toString();
    let arrayPush ={
      'messageId': Date.now().toString(),
      'mensaje': this.editorMsg,
      'toUserNames': this.myUserNames,
      'toUserFoto': this.myFoto,
      'toUser': this.myUsername,
      'myUserNames': this.parametros.toUserNombre,
      'myUserFoto': this.parametros.toUserFoto,
      'myUser': this.parametros.toUserName,
      'status': 'success'
    }

    console.log(this.parametros)
    if (this.chats) {
      this.chats.push(arrayPush);
      this.editorMsg = '';
      this.content.resize();
      this.scrollToBottom();

      this._ChatUsuarioService.newChatsAction(arrayPush).subscribe(
          response => {
            this.sendNotification(arrayPush);
            let index = this.getMsgIndexById(id);
            if (index !== -1) {
              this.chats[index].status = 'success';
            }
          }, 
          error => {
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
                alert(this.errorMessage);
            }
          }
      );
      
    } else {

      this._ChatUsuarioService.newChatsAction(arrayPush).subscribe(
        response => {
         this.sendNotification(arrayPush);
        }, 
        error => {
            this.errorMessage = <any>error;
            if(this.errorMessage != null){
              alert(this.errorMessage);
          }
        }
    );
      
    }
  }

  
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

  private onPushReceived(payload: OSNotificationPayload) {
    this.chats.push(payload.additionalData);
    this.editorMsg = '';
    this.scrollToBottom();
  }

  private getMensajes(){
    this._ChatUsuarioService.GetChatsAction(this.parametros).subscribe(
      response => {
          this.chats=response.chats;
          this.spiner = true; 
          this.onFocus();
          console.log(this.chats);
      }, 
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            alert(this.errorMessage);
        }
      }
  );
  }


  private sendNotification(arrayPush){
    let datos = {
      "app_id" : "861d4c12-f510-40c7-b0ca-e389b4d1345c",
      "include_player_ids" : [this.parametros.oneSignalId],
      "data" : arrayPush, 
      "headings":{"en":this.myUserNames}, 
      "android_group" : 'chat'+this.parametros.conversacionId, 
      "contents": {"en":arrayPush.mensaje},
      'status': 'pending'
  }
  console.log(datos);
  this._NotificacionService.sendUsuarios(datos).subscribe(
    responseNotificacion => { 
        this.getMensajes();
      }, 
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            alert(this.errorMessage);
        }
      }
    );
  }
  getMsgIndexById(id: string) {
    return this.chats.findIndex(e => e.messageId === id)
  }
  
}
