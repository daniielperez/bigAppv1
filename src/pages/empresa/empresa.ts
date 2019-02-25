import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';
import { EmpresaService } from '../../services/empresaService'; 




@Component({
  selector: 'page-empresa',
  templateUrl: 'empresa.html',
  providers: [
    EmpresaService
  ],
})

export class EmpresaPage {
  idEmpresa:any;
  empresa:any;
  redes:any;
  productos:any;
  spiner:boolean = false;
  errorMessage:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _EmpresaService: EmpresaService,
  ) {
    this.idEmpresa = this.navParams.get('idEmpresa');
    let parametros = {
      'id': this.idEmpresa
    }

    this._EmpresaService.empresaShowAction(parametros).subscribe( 
      response => {
        if(response.status ='success'){
            this.empresa=response.empresa; 
            this.productos=response.productos; 
            this.redes=response.redes; 
            this.spiner=true;
          }
      }, 
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }
  goToMapa(empresa){
    if (!empresa) empresa = {};
    this.navCtrl.push(MapaPage, {
      lat: empresa.lat,
      lng: empresa.lng,
      nombre: empresa.nombre
    });
  }goToChat(params){
    if (!params) params = {};
    this.navCtrl.push(ChatPage);
  }   
}
