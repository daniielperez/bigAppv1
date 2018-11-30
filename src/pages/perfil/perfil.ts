import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ComentariosPage } from '../comentarios/comentarios';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  constructor(public navCtrl: NavController) {
  }
  goToComentarios(params){
    if (!params) params = {};
    this.navCtrl.push(ComentariosPage);
  }
}
