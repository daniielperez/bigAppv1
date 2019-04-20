import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { EmpresasPage } from '../empresas/empresas';
import { CategoriasPage } from '../categorias/categorias';
import { NewSubastaPage } from '../new-subasta/new-subasta';
import { MunicipioService } from '../../services/municipioService'

@Component({
  selector: 'page-municipios',
  templateUrl: 'municipios.html',
  providers: [
    MunicipioService
  ],
})
export class MunicipiosPage {
  searchTerm: string = '';
  municipios :any = false;
  municipiosAll:any; 
  usuario:any; 
  errorMessage:any;
  tipo:any;

  constructor(public navCtrl: NavController,public _MunicipioService: MunicipioService,public navParams: NavParams) {
    this.tipo = this.navParams.get('tipo');
    this.usuario = this.navParams.get('usuario');
    console.log(this.tipo);
    console.log(this.usuario);
  }

  ngOnInit() { 
    this._MunicipioService.IndexAction().subscribe(
      response => {
        if(response.status ='success'){
            this.municipios=response.datos;
            this.municipiosAll = response.datos;
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
  goToSubasta(municipio){
    if (!municipio) municipio = {};
    this.navCtrl.push(NewSubastaPage, {
      idMunicipio: municipio.id,
      usuario: this.usuario
    });
  }

  filterItems(){
  this.municipios= this.municipiosAll.filter((item) => {
    return item.nombre.toLowerCase().indexOf(
      this.searchTerm.toLowerCase()) > -1;
    });
  }
}
