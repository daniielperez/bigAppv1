import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UsuarioService } from '../../services/usuarioService';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { YoutubeService } from '../../services/youtubeService';

/**
 * Generated class for the SocialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class SocialPage {
  public errorMessage:any;
  public usuario ={
    username:window.localStorage.getItem("username"),
  };
  public datos={
    username:this.usuario.username
  };

  public publicaciones:any;
  public publicacionesInfo=[];
  public publicacionesInfoScroll=[];
  public idPagina = 1;
  infiniteScroll:any= false;

  constructor(private YoutubeService:YoutubeService, private youtube: YoutubeVideoPlayer,public _UsuarioService: UsuarioService,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.loadingCtrl.create({
      content: "Cargando Publicaciones...",
    });
    loader.present();
    let data = {
      'idPagina':this.idPagina,
    }
    this._UsuarioService.IndexPaginatorAction(data).subscribe(
      response => {
        this.usuario = response.usuario;
        this.publicaciones = response.publicaciones;

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
 
  

  goToVideo(video) {
    console.log("ok");
    this.youtube.openVideo(video);
  }


  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.idPagina++;
    let data = {
      'idPagina':this.idPagina,
    }
    this._UsuarioService.IndexPaginatorAction(data).subscribe(
      response => {
        if(response.status ='success'){
          let publicaciones = response.publicaciones;
          if(publicaciones){
            publicaciones.forEach(p => {
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
                  console.log(this.publicacionesInfo);
                  
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
            
            
            this.infiniteScroll.complete();
          }else{
            this.infiniteScroll.enable(false);
          }
          
             
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }

}
