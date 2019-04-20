import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { EmpresaPage } from '../empresa/empresa';
import { ProductoService } from '../../services/productoService';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';
import { PedidoPage } from '../pedido/pedido';
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
  providers: [
    ProductoService,
  ],
})
export class ProductosPage {
  idMunicipio:any;
  idCategoria:any;
  productos:string[] = null;
  productoNombre:any='';
  errorMessage:any;
  spiner:any = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _ProductoService: ProductoService,) {
    this.idMunicipio = this.navParams.get('idMunicipio');
    this.idCategoria = this.navParams.get('idCategoria');
  }

 
  ngOnInit() {
    this.productos = null;  
    let parametros = {'tags':this.productoNombre,'categoriaId':this.idCategoria,'municipioId':this.idMunicipio};
    this._ProductoService.productoFiltroAction(parametros).subscribe( 
      response => {
        if(response.status ='success'){
              this.productos=response.datos;
              this.spiner=true;
          }
      }, 
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }
  goToEmpresa(params){
    if (!params) params = {};
    this.navCtrl.push(EmpresaPage);
  }goToMap(producto){
    this.navCtrl.push(MapaPage, {
      lat: producto.lat,
      lng: producto.lng,
      nombre: producto.nombreProducto
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
  onFilltro(value: string): void {
    this.spiner=false;
      let parametros = {'tags':this.productoNombre,'categoriaId':this.idCategoria,'municipioId':this.idMunicipio};
      this._ProductoService.productoFiltroAction(parametros).subscribe( 
        response => {
          if(response.status ='success'){
                this.productos=response.datos;
                this.spiner=true;
            }
        }, 
        error => {
            this.errorMessage = <any>error;
            console.log(error);
          }
      );
    }
    goToPedidoPage(producto){
      this.navCtrl.push(PedidoPage, {
        producto: producto
      });
    }
  
}
