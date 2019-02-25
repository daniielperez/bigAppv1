import { Component } from '@angular/core';
import { NavController, PopoverController  } from 'ionic-angular';
import { MunicipiosPage } from '../municipios/municipios';
import { EmpresasPage } from '../empresas/empresas';
import { EmpresaPage } from '../empresa/empresa';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';
import { BuscarProductosPage } from '../buscar-productos/buscar-productos';
import { PopoverEmpresaCardPage } from './popoverEmpresaCard';
import { PopoverProductoCardPage } from './popoverProductoCard';
import { ProductoService } from '../../services/productoService';
import { BanerPublicidadService } from '../../services/banerPublicidadService';
import { EmpresaService } from '../../services/empresaService'; 
import { Masonry,} from 'ng-masonry-grid';
import { PedidoPage } from '../pedido/pedido';


@Component({
  selector: 'page-big-app',
  templateUrl: 'big-app.html',
  providers: [
    ProductoService,
    EmpresaService,
    BanerPublicidadService,
  ],
})
export class BigAppPage {
 
  spiner:any=false;
  _masonry: Masonry;
  masonryItems:any[];
  productos:string[] = null;
  empresas:string[] = null;
  publicidades:string[] = null;
  errorMessage:any;
  infiniteScroll:any= false;
  idPagina:any = 1;
  show:any = true;
  stringBusquedaProducto;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public _ProductoService: ProductoService,
    public _EmpresaService: EmpresaService,
    public _BanerPublicidadService: BanerPublicidadService,
  ) {
  }

  

  ngOnInit() { 
    this.idPagina = 1;
    this.productos = null; 
    this.empresas = null;
    this.publicidades = null;
    let data = {
      'idPagina':1,
    }
    this._EmpresaService.IndexPaginatorAction(data).subscribe(
      response => {
        if(response.status ='success'){
          if (this._masonry) {
              this.empresas=response.datos;
            }
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
    this._BanerPublicidadService.IndexPaginatorAction(data).subscribe(
      response => {
        if(response.status ='success'){
          if (this._masonry) {
              this.publicidades=response.datos;
            }
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
    this._ProductoService.IndexPaginatorAction(data).subscribe(
      response => {
       
        if(response.status ='success'){
          if (this._masonry) {
              this.productos=response.datos;
            }
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }

  onNgMasonryInit($event: Masonry) {
    console.log('ssssssssssssssssssss');
    this._masonry = $event;
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverEmpresaCardPage,{key1:'value1', key2: 'value2'}, { cssClass: 'edit-opty-popover' });
    popover.present({
      ev: myEvent
    });
  }
  presentPopoverProducto(myEvent,producto) {
    let popover = this.popoverCtrl.create(PopoverProductoCardPage,{lat:producto.lat,lng:producto.lng,label:producto.nombreProducto}, { cssClass: 'edit-opty-popover-producto' });
    
    popover.present({
      ev: myEvent
    });
  }

  goToMunicipiosProducto(params){
    if (!params) params = {};
    this.navCtrl.push(MunicipiosPage, {
      tipo: 'producto'
    });
  }goToMunicipiosEmpresa(params){
    if (!params) params = {};
    this.navCtrl.push(MunicipiosPage, {
      tipo: 'empresa'
    });
  }goToEmpresas(params){
    if (!params) params = {};
    this.navCtrl.push(EmpresasPage);
  }goToEmpresa(empresa){
    if (!empresa) empresa = {};
    this.navCtrl.push(EmpresaPage, {
      idEmpresa: empresa.id
    });
  }goToChat(producto){
    let toUser = {
      conversacionId:producto.conversacionId,
      toUserName:producto.username,
      toUserFoto:producto.foto,
      oneSignalId:producto.oneSignalId,
    }
    console.log(toUser); 
    if (!producto) producto = {};
    this.navCtrl.push(ChatPage, toUser);
  }goToMap(producto){
    this.navCtrl.push(MapaPage, {
      lat: producto.lat,
      lng: producto.lng,
      nombre: producto.nombreProducto
    });
  }
  goToPedidoPage(producto){
    this.navCtrl.push(PedidoPage, {
      producto: producto
    });
  }

  doRefresh(refresher) {
    this.show = false;
    this.idPagina = 1;
    this.productos = null;
    this.empresas = null;
    let data = {
      'idPagina':this.idPagina,
    }
    this._EmpresaService.IndexPaginatorAction(data).subscribe(
      response => {
        if(response.status ='success'){
          this.show = true; 
          console.log(this._masonry);
          if (this._masonry) {
              this.empresas=response.datos;
            }
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
    this._ProductoService.IndexPaginatorAction(data).subscribe(
      response => {
        if(response.status ='success'){
          if (this._masonry) {
              this.productos=response.datos;
              this.onNgMasonryInit(this._masonry);
              if (this.infiniteScroll) {
                this.infiniteScroll.enable(true);
              }
              refresher.complete();
            }
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }

  

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.idPagina++;
    let data = {
      'idPagina':this.idPagina,
    }
    this._ProductoService.IndexPaginatorAction(data).subscribe(
      response => {
        if(response.status ='success'){
            if (this._masonry) {
              let productosOerder =response.datos;
              if (productosOerder) {
                productosOerder.forEach(element => {
                  this.productos.push( element );
                  this.infiniteScroll.complete();
                });
              }else{
                this.infiniteScroll.enable(false);
              }
            }
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }

  buscarProducto(){
    this.navCtrl.push(BuscarProductosPage, {
      stringBusquedaProducto: this.stringBusquedaProducto 
    });
  }
}
