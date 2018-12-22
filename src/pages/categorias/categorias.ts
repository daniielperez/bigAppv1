import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { ProductosPage } from '../productos/productos';
import { CategoriaService } from '../../services/categoriaService'

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
  providers: [
    CategoriaService
  ],
})
export class CategoriasPage {
  categorias :any[];
  errorMessage:any;
  idMunicipio:any;

  constructor(public navCtrl: NavController,public _CategoriaService: CategoriaService,public navParams: NavParams) {
    this.idMunicipio = this.navParams.get('idMunicipio');
  }

  ngOnInit() { 
    this._CategoriaService.IndexAction().subscribe(
      response => {
        if(response.status ='success'){
            this.categorias=response.datos;
          }
      },   
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );
  }
  goToProductos(categoria){
    if (!categoria) categoria = {};
    this.navCtrl.push(ProductosPage, {
      idCategoria: categoria.id,
      idMunicipio: this.idMunicipio,
    });
  }
}
