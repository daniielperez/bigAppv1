import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { BigAppPage } from '../big-app/big-app';
import { UsuarioService } from '../../services/usuarioService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  usuario = {
    grant_type:'password',
    client_id: '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
    client_secret:'4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k', 
    username: '', 
    password: ''};
    errorMessage:any;

  public datos={
    username:''
  };

  constructor(
    public navCtrl: NavController,
    public _UsuarioService: UsuarioService,) {
  }
  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }

  onLogin(){
  this._UsuarioService.loginAction(this.usuario).subscribe(
      response => {
          window.localStorage.setItem('username', this.usuario.username);
          window.localStorage.setItem('token', response.access_token);
          this.navCtrl.setRoot(BigAppPage);
      }, 
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            if (this.errorMessage.statusText == 'Bad Request') {
              }
        }
      }
  );
  this.datos.username = this.usuario.username;
  this._UsuarioService.UsuarioAction(this.datos).subscribe(
    response => {
      window.localStorage.setItem('fotoPerfil', response.usuario.fotoPerfil);
      window.localStorage.setItem('fotoPortada', response.usuario.fotoPortada);
      console.log(response);
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
}
