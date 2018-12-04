import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ComentarioService } from '../../services/comentarioService';


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

  constructor(public navCtrl: NavController,private navParams: NavParams,public _ComentarioService: ComentarioService,) {
    this.parametros = {'publicacionId':navParams.get('item')};
  }
ngOnInit(){
  

  this._ComentarioService.comentarioPublicacionAction(this.parametros).subscribe(
    response => {
        this.comentarios = response.datos; 
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
  
}
