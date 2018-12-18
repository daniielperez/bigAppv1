import { Component } from '@angular/core';
import { NavController, PopoverController  } from 'ionic-angular';
import { MunicipiosPage } from '../municipios/municipios';
import { EmpresasPage } from '../empresas/empresas';
import { EmpresaPage } from '../empresa/empresa';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';
import { PopoverEmpresaCardPage } from './popoverEmpresaCard';
import { PopoverProductoCardPage } from './popoverProductoCard';
import { ProductoService } from '../../services/productoService';
import { EmpresaService } from '../../services/empresaService'; 
import { Masonry, MasonryGridItem } from 'ng-masonry-grid';


@Component({
  selector: 'page-big-app',
  templateUrl: 'big-app.html',
  providers: [
    ProductoService,
    EmpresaService,
  ],
})
export class BigAppPage {
  spiner:any=false;
  _masonry: Masonry;
  masonryItems:any[];
  productos:string[];
  errorMessage:any;
  infiniteScroll:any;
  idPagina:any = 1;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public _ProductoService: ProductoService,
    public _EmpresaService: EmpresaService,
  ) {
  }

  ngOnInit() { 
    this.idPagina = 1;
    this.productos = null;
    let data = {
      'idPagina':this.idPagina,
    }
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
    console.log('ok'); 
    this._masonry = $event;
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverEmpresaCardPage,{key1:'value1', key2: 'value2'}, { cssClass: 'edit-opty-popover' });
    popover.present({
      ev: myEvent
    });
  }
  presentPopoverProducto(myEvent,producto) {
    let popover = this.popoverCtrl.create(PopoverProductoCardPage,{lat:producto.lat,lng:producto.lng,label:producto.nombre}, { cssClass: 'edit-opty-popover-producto' });
    
    popover.present({
      ev: myEvent
    });
  }

  goToMunicipios(params){
    if (!params) params = {};
    this.navCtrl.push(MunicipiosPage);
  }goToEmpresas(params){
    if (!params) params = {};
    this.navCtrl.push(EmpresasPage);
  }goToEmpresa(params){
    if (!params) params = {};
    this.navCtrl.push(EmpresaPage);
  }goToMapa(params){
    if (!params) params = {};
    this.navCtrl.push(MapaPage);
  }goToChat(params){
    if (!params) params = {};
    this.navCtrl.push(ChatPage);
  }

  doRefresh(refresher) {
    this.idPagina = 1;
    this.productos = null;
    let data = {
      'idPagina':this.idPagina,
    }
    this._ProductoService.IndexPaginatorAction(data).subscribe(
      response => {
        if(response.status ='success'){
          if (this._masonry) {
              this.productos=response.datos;
              this.infiniteScroll.enable(true);
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

  goToMap(producto){
    this.navCtrl.push(MapaPage, {
      lat: producto.lat,
      lng: producto.lng,
      nombre: producto.nombre
    });
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
}
