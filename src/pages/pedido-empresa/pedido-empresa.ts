import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from "../../services/pedidoService";
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the PedidoEmpresaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido-empresa',
  templateUrl: 'pedido-empresa.html',
})
export class PedidoEmpresaPage {
  pedidos:any;
  errorMessage:any;
  datos = {
    'empresaId':""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public _pedidoService:PedidoService,public loadingCtrl: LoadingController) {
    this.datos.empresaId = this.navParams.get("empresaId");
    console.log(this.datos);
    this.cargarDatos();
  }

  ionViewDidLoad() {
    
  }

  cargarDatos(){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this._pedidoService.indexByEmpresaAction(this.datos).subscribe(
      response => {
        if(response.status ='success'){
            this.pedidos = response.pedidos
            console.log(this.pedidos);
            loader.dismiss();
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }

}
