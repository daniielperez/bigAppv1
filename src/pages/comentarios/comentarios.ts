import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ComentarioService } from '../../services/comentarioService';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html'
})
export class ComentariosPage {

  errorMessage:any;
  usuario:any = false;
  comentarios:any = false;
  spiner:any=false;
  parametros:any;

  params={
    'usuario':window.localStorage.getItem("username"),
    'publicacionId':"",
    'contenido':""
  }

  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController,private navParams: NavParams,public _ComentarioService: ComentarioService,) {
    this.parametros = {'publicacionId':navParams.get('item')};
    this.params.publicacionId = this.parametros.publicacionId;
  }
ngOnInit(){
  const loader = this.loadingCtrl.create({
    content: "Cargando Comentarios..."
  });
  loader.present();

  this._ComentarioService.comentarioPublicacionAction(this.parametros).subscribe(
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
  this._ComentarioService.comentarioPublicacionDeleteAction(datos).subscribe(
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
  
  this._ComentarioService.newComentarioAction(this.params).subscribe(
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
