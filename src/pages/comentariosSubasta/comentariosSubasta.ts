import { Component } from '@angular/core';
import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { ComentarioSubastaService } from '../../services/comentarioSubastaService';


@Component({
  selector: 'page-comentariosSubasta',
  templateUrl: 'comentariosSubasta.html',
  providers: [
    ComentarioSubastaService
  ],
})
export class ComentariosSubastaPage {

  errorMessage:any;
  usuario:any = false;
  comentarios:any = false;
  spiner:any=false;
  parametros:any;
  params={
    'usuario':window.localStorage.getItem("username"),
    'subastaId':"",
    'contenido':""
  }

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public _ComentarioSubastaService: ComentarioSubastaService,
    public loadingCtrl: LoadingController
  ) {
    this.params.subastaId = navParams.get('item');
  }
  
ngOnInit(){
  const loader = this.loadingCtrl.create({
    content: "Cargando Comentarios..."
  });
  loader.present();
  this._ComentarioSubastaService.comentarioSubastaAction(this.params).subscribe(
    response => {
        this.comentarios = response.datos; 
        loader.dismiss();
    }, 
    error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          alert(this.errorMessage);
      }
    }
);
} 

eliminarComentario(comentarioId){
  let datos={
    comentarioId:comentarioId
  }
  console.log(datos);
  this._ComentarioSubastaService.comentarioSubastaDeleteAction(datos).subscribe(
    response => {
        this.comentarios = response.datos; 
        console.log(response);
    }, 
    error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          alert(this.errorMessage);
      }
    }
  );
  this.ngOnInit();

}

enviar(){
  
  this._ComentarioSubastaService.newComentarioAction(this.params).subscribe(
    response => {
        this.comentarios = response.datos; 
        this.params.contenido = "";
        this.ngOnInit();
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
