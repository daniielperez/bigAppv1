import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ComentariosPage } from '../comentarios/comentarios';
import { SubastaService } from '../../services/subastaService';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from 'ionic-angular';
import { NewPostPage } from '../new-post/new-post';

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

  public errorMessage;

  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public _SubastaService: SubastaService,public sanitizer: DomSanitizer) {
  }
  goToComentarios(publicacionId){
    console.log(publicacionId);
    this.navCtrl.push(ComentariosPage,{
      item:publicacionId,
    });
  }

  ngOnInit(){
    this._SubastaService.IndexAction(this.usuario).subscribe(
      response => {
        this.usuario = response.usuario;
        this.subastas = response.subastas;
        console.log(this.subastas);
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

  goToNewPostPage(usuario) {
    console.log(usuario);
    this.navCtrl.push(NewPostPage,{
      usuario:usuario,
    });
  }
}
