import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ComentariosPage } from '../comentarios/comentarios';
import { UsuarioService } from '../../services/usuarioService';
import { YoutubeService } from '../../services/youtubeService';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from 'ionic-angular'; 
import { NewPostPage } from '../new-post/new-post';
import { FotosPage } from '../fotos/fotos';
import { PostVideoPage } from '../post-video/post-video';
import { TextPostPage } from '../text-post/text-post';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { LoadingController } from 'ionic-angular';

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
  public publicacionesInfo=[];

  public errorMessage;

  constructor(private YoutubeService:YoutubeService, private youtube: YoutubeVideoPlayer,public loadingCtrl: LoadingController,public modalCtrl: ModalController,public navCtrl: NavController,public _UsuarioService: UsuarioService,public sanitizer: DomSanitizer) {
  }
  goToComentarios(publicacionId){
    this.navCtrl.push(ComentariosPage,{
      item:publicacionId,
    });
  }
  ngOnInit(){
    let loader = this.loadingCtrl.create({
      content: "Cargando Publicaciones...",
    });
    loader.present();
    this._UsuarioService.UsuarioAction(this.datos).subscribe(
      response => {
        this.usuario = response.usuario;
        this.publicaciones = response.publicaciones;
        if (this.publicaciones) {
          this.publicaciones.forEach(p => {
            this.YoutubeService.infoAction(p.urlVideo).subscribe(
              response => {
                if(p.urlVideo == null){
                  let array = {
                    'id':p.id,
                    'contenido':p.contenido,
                    'nombres':p.nombres,
                    'imagen':p.imagen,
                    'urlVideo':p.urlVideo,
                    'fecha':p.fecha,
                    'fotoPerfil':p.fotoPerfil,
                    
                  } 
                  this.publicacionesInfo.push(array);
                }else{
                  let array = {
                    'id':p.id,
                    'contenido':p.contenido,
                    'nombres':p.nombres,
                    'imagen':p.imagen,
                    'urlVideo':p.urlVideo,
                    'fotoPerfil':p.fotoPerfil,
                    'fecha':p.fecha,
                    'imagenVideo':response.items[0].snippet.thumbnails.high.url,
                  }
                   this.publicacionesInfo.push(array);
                }
                
              }, 
              error => {
                  this.errorMessage = <any>error;
                  if(this.errorMessage != null){
                    if (this.errorMessage.statusText == 'Bad Request') {
                      }
                }
              }
            
          );
          });
        }
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

  goToNewPostPage(usuario) {
    this.navCtrl.push(NewPostPage,{
      usuario:usuario,
    });
  }

  goToNewPostTextPage(usuario) {
    this.navCtrl.push(TextPostPage,{
      usuario:usuario,
    });
  }
  goToNewPostVideoPage(usuario) {
    this.navCtrl.push(PostVideoPage,{
      usuario:usuario,
    });
  }

  goToVideo(video) {
    console.log("ok");
    this.youtube.openVideo(video);
  }


  goToFotosPage(usuario) {
    this.navCtrl.push(FotosPage,{
      usuario:usuario,
    });
  }


}
