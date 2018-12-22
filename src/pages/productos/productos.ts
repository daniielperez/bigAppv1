import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { EmpresaPage } from '../empresa/empresa';
import { ProductoService } from '../../services/productoService';
import { MapaPage } from '../mapa/mapa';
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
      nombre: producto.nombre
    });
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
  
}
