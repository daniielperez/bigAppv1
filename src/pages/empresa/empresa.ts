import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';
import { SubastaPage } from '../subasta/subasta';
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
  propietario:boolean = false;
  errorMessage:any;
  empresaIdUsuario = localStorage.getItem("empresaId");
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _EmpresaService: EmpresaService,
  ) {
    this.idEmpresa = this.navParams.get('idEmpresa');
    let parametros = {
      'id': this.idEmpresa
    }

    if (this.empresaIdUsuario ==  this.idEmpresa) {
      this.propietario = true;
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
  }goToSubasta(tipoSubasta){
    if (!tipoSubasta) tipoSubasta = {};
    this.navCtrl.setRoot(SubastaPage, {
      tipoSubasta: tipoSubasta
    });
  }   
}
