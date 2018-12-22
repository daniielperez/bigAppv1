import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { EmpresaPage } from '../empresa/empresa';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';
import { EmpresaService } from '../../services/empresaService'; 

@Component({
  selector: 'page-empresas',
  templateUrl: 'empresas.html',
  providers: [
    EmpresaService
  ],
})
export class EmpresasPage {
  idMunicipio:any;
  spiner:any = false;
  empresaNombre:any = '';
  errorMessage:any;
  empresas:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _EmpresaService: EmpresaService,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.idMunicipio = this.navParams.get('idMunicipio');
  } 
  ngOnInit() {
    let parametros = {'tags':this.empresaNombre,'municipioEmpresaId':this.idMunicipio};
      this._EmpresaService.empresaFiltroAction(parametros).subscribe( 
        response => {
          if(response.status ='success'){
              this.empresas=response.datos; 
              this.spiner=true;
            }
        }, 
        error => {
            this.errorMessage = <any>error;
            console.log(error);
          }
      );
  }

  onFilltro(value: string): void {
    this.spiner=true;  
    let parametros = {'tags':this.empresaNombre,'municipioEmpresaId':this.idMunicipio};
      this._EmpresaService.empresaFiltroAction(parametros).subscribe( 
        response => {
          if(response.status ='success'){
              this.empresas=response.datos;
              console.log(this.empresas);
              this.spiner=false;
            }
        }, 
        error => {
            this.errorMessage = <any>error;
            console.log(error);
          }
      );
  
  }

  presentActionSheet(empresa) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Visitar',
          role: 'visitar',
          handler: () => {
            this.navCtrl.push(EmpresaPage, {
              idEmpresa: empresa.id
            });
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  goToEmpresa(params){
    if (!params) params = {};
    this.navCtrl.push(EmpresaPage);
  }goToMapa(params){
    if (!params) params = {};
    this.navCtrl.push(MapaPage);
  }goToChat(params){
    if (!params) params = {};
    this.navCtrl.push(ChatPage);
  }
}
