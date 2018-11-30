import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioService } from '../../services/usuarioService';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public usuario ={
    username:"",
    nombres:"",
    apellidos:"",
    celular:"",
    email:"",
    rol:"",
    password:"",
  };

  public errorMessage;

  constructor(public navCtrl: NavController,
  public _UsuarioService: UsuarioService,
  public loadingCtrl: LoadingController) {
  }

  goToCreateUser(){
    const loader = this.loadingCtrl.create({
      content: "Por favor Espere...",
    });
    loader.present();
    this._UsuarioService.NewAction(this.usuario).subscribe(
      response => {
        if(response.status ='success'){
         loader.dismiss();
         this.navCtrl.setRoot(LoginPage);
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
  }
  
}
