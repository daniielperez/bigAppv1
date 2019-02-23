import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductoService } from '../../services/productoService'; 
import { LoadingController } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
import { EmpresaPage } from '../empresa/empresa';
import { ChatPage } from '../chat/chat';

/**   
 * Generated class for the BuscarProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar-productos',
  templateUrl: 'buscar-productos.html',
  providers: [
    ProductoService,
  ],
})
export class BuscarProductosPage {
  stringBusqueda;
  errorMessage;
  data:any;
  productos:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public ProductoService:ProductoService,public loadingCtrl: LoadingController) {
    this.stringBusqueda = this.navParams.get('stringBusquedaProducto');
    this.data={
      stringBusqueda:this.stringBusqueda,
      idPagina:1
    }
    const loader = this.loadingCtrl.create({
      content: "Cargando Productos...",
    });
    loader.present();
    this.ProductoService.BusquedaGeneralAction(this.data).subscribe(
      response => {
        this.productos = response.productos;
        loader.dismiss();
        console.log(this.productos);
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }
  goToMap(producto){
    this.navCtrl.push(MapaPage, {
      lat: producto.lat,
      lng: producto.lng,
      nombre: producto.nombreProducto
    });
  }
  goToEmpresa(empresa){
    if (!empresa) empresa = {};
    this.navCtrl.push(EmpresaPage, {
      idEmpresa: empresa.id
    });
  }
  goToChat(producto){
    let toUser = {
      conversacionId:producto.conversacionId,
      toUserName:producto.username,
      toUserFoto:producto.foto,
      oneSignalId:producto.oneSignalId,
    }
    console.log(toUser); 
    if (!producto) producto = {};
    this.navCtrl.push(ChatPage, toUser);
  }

  ionViewDidLoad() {
    console.log(this.stringBusqueda);
  }

}
