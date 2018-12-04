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

@Component({
  selector: 'page-big-app',
  templateUrl: 'big-app.html',
  providers: [
    ProductoService
  ],
})
export class BigAppPage {
  spiner:any=false;
  productos:string[];
  errorMessage:any;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public _ProductoService: ProductoService,
  ) {
  }

  ngOnInit() { 
    this.spiner=true;
    this._ProductoService.IndexAction().subscribe(
      response => {
        if(response.status ='success'){
            this.productos=response.datos;
            this.spiner=false;
          }
      },  
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverEmpresaCardPage,{key1:'value1', key2: 'value2'}, { cssClass: 'edit-opty-popover' });
    popover.present({
      ev: myEvent
    });
  }
  presentPopoverProducto(myEvent) {
    let popover = this.popoverCtrl.create(PopoverProductoCardPage,{idProducto:1}, { cssClass: 'edit-opty-popover-producto' });
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
    this._ProductoService.IndexAction().subscribe(
      response => {
        if(response.status ='success'){
            this.productos=response.datos;
            refresher.complete();

          }
      },  
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }

}
