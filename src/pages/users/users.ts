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
  user:any=null;
  errorMessage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _amigoService:AmigoService) {

    this.datos.stringBusqueda = this.navParams.get('stringBusqueda');
    console.log(this.stringBusqueda);

    this._amigoService.FindAmigoUsurio(this.datos).subscribe(
      response => {
        if(response.status ='success'){
            this.user=response.user;
            console.log(this.user);
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }

  ionViewDidLoad() {
    
  }

}
