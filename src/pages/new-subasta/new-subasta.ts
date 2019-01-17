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
    console.log(this.params);
    let datos = {
        "app_id" : "861d4c12-f510-40c7-b0ca-e389b4d1345c",
        "include_player_ids" :["ce108ef4-a5bc-481f-a528-2d395144aeb2"],
        "data" : {"foo":"bar"}, 
        "contents": {"en":"content"} 
     
    }
    this._NotificacionService.sendUsuarios(datos).subscribe(
      response => {
          console.log(response);
      }, 
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            alert(this.errorMessage);
        }
      }
    );
    // this._SubastaService.NewAction(this.params).subscribe(
    //   response => {
    //       if (response.status=='success') {
    //         this.navCtrl.setRoot(SubastaPage);
    //         const toast = this.toastCtrl.create({
    //           message: 'Subasta publicada',
    //           duration: 3000
    //         });
    //         toast.present();
    //       }
    //   }, 
    //   error => {
    //       this.errorMessage = <any>error;
    //       if(this.errorMessage != null){
    //         alert(this.errorMessage);
    //     }
    //   }
    // );
  }

}
