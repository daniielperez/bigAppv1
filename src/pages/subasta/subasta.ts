import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { ComentariosSubastaPage } from '../comentariosSubasta/comentariosSubasta';
import { SubastaService } from '../../services/subastaService';
import { DomSanitizer } from '@angular/platform-browser'; 
import { ModalController,NavParams } from 'ionic-angular';
import { NewSubastaPage } from '../new-subasta/new-subasta';
import { MunicipiosPage } from '../municipios/municipios';
// import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';

@Component({
  selector: 'page-subasta',
  templateUrl: 'subasta.html',
  providers: [
    SubastaService
  ],
})
export class SubastaPage {

  public usuario ={
    username:window.localStorage.getItem("username"),
    fotoPerfil:window.localStorage.getItem("fotoPerfil"),
    fotoPortada:window.localStorage.getItem("fotoPortada"),
  };
  
  public subastas:any;
  public tipoSubasta:any;

  public errorMessage;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public _SubastaService: SubastaService,
    public sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    // private oneSignal: OneSignal,
  ) {

      // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      // this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
      // this.oneSignal.endInit();
  }
  goToComentarios(subastaId){
    console.log(subastaId);
    this.navCtrl.push(ComentariosSubastaPage,{
      item:subastaId,
    });
  }

  ngOnInit(){
    this.tipoSubasta = this.navParams.get('tipoSubasta');
    // alert(this.tipoSubasta);
    let loader = this.loadingCtrl.create({
      content: "Cargando Subastas...",
    });
    loader.present();

    if (this.tipoSubasta == 'subastaUsuario') {
        this._SubastaService.IndexAction(this.usuario).subscribe(
            response => {
              this.usuario = response.usuario;
              this.subastas = response.subastas;
              loader.dismiss();
            }, 
            error => {
                this.errorMessage = <any>error;
                if(this.errorMessage != null){
                  if (this.errorMessage.statusText == 'Bad Request') {
                    }
              }
            }
        );
    }else{
      let datos = {
        'empresaId' :localStorage.getItem("empresaId")
      };
      this._SubastaService.IndexEmpresaAction(datos).subscribe(
          response => {
            this.usuario = response.usuario;
            this.subastas = response.subastas;
            loader.dismiss();
          }, 
          error => {
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
                if (this.errorMessage.statusText == 'Bad Request') {
                  }
            }
          }
      );
      
    }
    
  }

  // private onPushReceived(payload: OSNotificationPayload) {
  //   alert('Push recevied desde subasta:' + payload.body);
  // }
  
  goToNewSubastaPage(usuario) {
    console.log(usuario);
    this.navCtrl.push(NewSubastaPage,{
      usuario:usuario,
    });
  }

  goToMunicipiosEmpresa(usuario){
    if (!usuario) usuario = {};
    this.navCtrl.push(MunicipiosPage, {
      tipo: 'subasta',
      usuario: usuario
    });
  }
}
