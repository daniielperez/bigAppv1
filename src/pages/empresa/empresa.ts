import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
import { ChatPage } from '../chat/chat';
import { SubastaPage } from '../subasta/subasta';
import { PedidoEmpresaPage } from '../pedido-empresa/pedido-empresa';
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
  calificacion:any;
  calificacionUsuario:any;
 
  valoresCalificacion:any=[
    {value:'1',label:'1'},
    {value:'2',label:'2'},
    {value:'3',label:'3'},
    {value:'4',label:'4'},
    {value:'5',label:'5'},
  ];
  valorCalificacion:number = null;
  productos:any;
  spiner:boolean = false;
  propietario:boolean = false;
  errorMessage:any;
  empresaIdUsuario = localStorage.getItem("empresaId");
  username = localStorage.getItem("username");
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _EmpresaService: EmpresaService,
    public toastCtrl: ToastController,
  ) {
    this.idEmpresa = this.navParams.get('idEmpresa');

    let parametros = {
      'id': this.idEmpresa,
      'idUsuarioCalificacion': this.username
      // 'calificacion':this.valorCalificacion
    }
    console.log();
    if (this.empresaIdUsuario ==  this.idEmpresa) {
      this.propietario = true;
    }

    this._EmpresaService.empresaShowAction(parametros).subscribe( 
      response => {
        if(response.status ='success'){
            this.empresa=response.empresa; 
            this.productos=response.productos;  
            this.redes=response.redes; 
            this.calificacionUsuario=response.calificacionUsuario; 
            this.valorCalificacion = this.calificacionUsuario;
            this.calificacion = response.calificacion;
            console.log(this.calificacion);
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
  }goToSubasta(tipoSubasta){
    if (!tipoSubasta) tipoSubasta = {};
    this.navCtrl.setRoot(SubastaPage, {
      tipoSubasta: tipoSubasta
    });
  }   

  goToPedido(){
    console.log(this.idEmpresa);
    this.navCtrl.push(PedidoEmpresaPage, {
      empresaId: this.idEmpresa
    });
  }

  onChangeCalificacion(value:number){
    let parametros = {
      'id': this.idEmpresa,
      'idUsuarioCalificacion': this.username,
      'calificacion':value
    }

    this._EmpresaService.empresaNewCalificacionAction(parametros).subscribe( 
      response => {
        if(response.status ='success'){
          const toast = this.toastCtrl.create({
            message: 'Empresa calificada: '+value,
            duration: 3000
          });
          toast.present();
          }
      }, 
      error => {
          this.errorMessage = <any>error;
          console.log(error);
        }
    );

   
  }
}
