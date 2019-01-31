import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { SubastaPage } from '../subasta/subasta';
import { MunicipioService } from '../../services/municipioService';
import { CategoriaService } from '../../services/categoriaService'; 
import { SubastaService } from '../../services/subastaService';
import { NotificacionService } from '../../services/notificacionService';
 
/**
 * Generated class for the NewSubastaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-subasta',
  templateUrl: 'new-subasta.html',
  providers: [
    MunicipioService,
    CategoriaService,
    SubastaService,
    NotificacionService,
  ],
})
export class NewSubastaPage implements OnInit{
  usuario:any;
  municipios:any;
  categorias:any;
  errorMessage:any;
  params = {
    contenido:"",
    categoria:"",
    municipio:"",
    usuario: '',
  }

  imageURI:any; 
  imageFileName:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public _MunicipioService: MunicipioService,
    public _CategoriaService: CategoriaService,
    public _SubastaService: SubastaService,
    public _NotificacionService: NotificacionService,
  
  ) {
    this.usuario = this.navParams.get('usuario');
    this.params.usuario = this.usuario.username;
    console.log(this.usuario.username);
  }

  ngOnInit() {  
    this._MunicipioService.IndexAction().subscribe( 
      response => {
        if(response.status =='success'){
            this.municipios=response.datos;
          }
      }, 
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );

    this._CategoriaService.IndexAction().subscribe( 
      response => {
        if(response.status == 'success'){
            this.categorias=response.datos;
          }
      }, 
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }

  ionViewDidLoad() {
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();

    this.navCtrl.push(SubastaPage,{
    });
  }
  enviar(){
    this._SubastaService.NewAction(this.params).subscribe(
      responseSubasta => {
        // console.log(responseSubasta);  
          if (responseSubasta.status=='success') {
            if(responseSubasta.arrayPlayersId != ''){
              let datos = {
                "app_id" : "861d4c12-f510-40c7-b0ca-e389b4d1345c",
                "include_player_ids" : responseSubasta.arrayPlayersId,
                "data" : {"tipo":"subasta"}, 
                "headings":{"en":'Nueva peticion de subasta'}, 
                "android_group" : responseSubasta.contenido, 
                "contents": {"en":responseSubasta.contenido}
            }
            console.log(datos);
            this._NotificacionService.sendUsuarios(datos).subscribe(
              responseNotificacion => { 
                  this.navCtrl.setRoot(SubastaPage);
                  const toast = this.toastCtrl.create({
                    message: 'Subasta publicada',
                    duration: 3000
                  });
                  toast.present();
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
