import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AmigoService } from '../../services/amigoService';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  datos = {
    'stringBusqueda':""
  }
  stringBusqueda:any;
  usuarios:any=null;
  user:any=null;
  busqueda:any=null;
  errorMessage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _amigoService:AmigoService) {

    this._amigoService.IndexPagAction().subscribe(
      response => {
        if(response.status ='success'){
            this.usuarios = response.usuarios;
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }

  onFilltro(): void {
    console.log(this.datos.stringBusqueda);

    this._amigoService.FindAmigoUsurio(this.datos).subscribe(
      response => {
        if(response.status ='success'){
            this.usuarios=response.usuarios;
            console.log(this.usuarios);
          }
      },   
      error => { 
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
    
  
  }

}
