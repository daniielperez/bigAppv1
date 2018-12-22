import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { EmpresasPage } from '../empresas/empresas';
import { CategoriasPage } from '../categorias/categorias';
import { MunicipioService } from '../../services/municipioService'

@Component({
  selector: 'page-municipios',
  templateUrl: 'municipios.html',
  providers: [
    MunicipioService
  ],
})
export class MunicipiosPage {
  municipios :any = false;
  errorMessage:any;
  tipo:any;

  constructor(public navCtrl: NavController,public _MunicipioService: MunicipioService,public navParams: NavParams) {
    this.tipo = this.navParams.get('tipo');
  }

  ngOnInit() { 
    this._MunicipioService.IndexAction().subscribe(
      response => {
        if(response.status ='success'){
            this.municipios=response.datos;
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }
  goToEmpresas(municipio){
    if (!municipio) municipio = {};
    this.navCtrl.push(EmpresasPage, {
      idMunicipio: municipio.id
    });
  }
  goToCategorias(municipio){
    if (!municipio) municipio = {};
    this.navCtrl.push(CategoriasPage, {
      idMunicipio: municipio.id
    });
  }
}
