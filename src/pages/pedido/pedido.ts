import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedioPagoService } from '../../services/medioPagoService'; 
import { PedidoService } from '../../services/pedidoService'; 
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {
  public pedido = {
    medioPagoId:'',
    productoId:'',
    username:'',
    descripcion:'',
    direccion:'',
    
  }
  public producto:any;
  public mediosPago:any;
  public errorMessage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _medioPagoService : MedioPagoService,
    public _pedidoService :PedidoService,
    public alertCtrl: AlertController
  ) {
    this.producto = this.navParams.get('producto');
    this.pedido.productoId = this.producto.id;
    this.pedido.username = window.localStorage.getItem("username");


    this._medioPagoService.IndexAction().subscribe(
      response => {
        if(response.status ='success'){
            this.mediosPago = response.mediosPago
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );

  }


  enviar(){
    this.showAlert();
    this._pedidoService.enviarAction(this.pedido).subscribe(
      response => {
        if (response.status == "success") {
          console.log("ok");
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

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Producto Solicitado',
      subTitle: 'Su peticion fue concretada contacte con el vendedor!',
      buttons: ['OK']
    });
    alert.present();
  }
}

  

 

