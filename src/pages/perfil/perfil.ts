import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ComentariosPage } from '../comentarios/comentarios';
import { UsuarioService } from '../../services/usuarioService';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from 'ionic-angular';
import { NewPostPage } from '../new-post/new-post';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  public usuario ={
    username:window.localStorage.getItem("username"),
    fotoPerfil:window.localStorage.getItem("fotoPerfil"),
    fotoPortada:window.localStorage.getItem("fotoPortada"),
  };
  public datos={
    username:this.usuario.username
  };

  public publicaciones:any;

  public errorMessage;

  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public _UsuarioService: UsuarioService,public sanitizer: DomSanitizer) {
  }
  goToComentarios(publicacionId){
    console.log(publicacionId);
    this.navCtrl.push(ComentariosPage,{
      item:publicacionId,
    });
  }
  ngOnInit(){
    this._UsuarioService.UsuarioAction(this.datos).subscribe(
      response => {
        this.usuario = response.usuario;
        this.publicaciones = response.publicaciones;
        console.log(this.publicaciones);
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
