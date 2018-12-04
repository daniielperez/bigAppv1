import { Component } from '@angular/core';
import { NavController, ViewController, NavParams  } from 'ionic-angular';
import { EmpresaPage } from '../empresa/empresa';



@Component({
  template: `
    <ion-list>
      <button ion-item on-click="goToEmpresa()">Visita empresa</button>
      <button ion-item (click)="close()">Como llegar</button>
      <button ion-item (click)="close()">Dialogo</button>
    </ion-list>
  `
})
export class PopoverProductoCardPage {

    idProducto:any = this.navParams.get('idProducto');

    constructor(public navCtrl: NavController,public viewCtrl: ViewController,public navParams: NavParams) {
    }
    close() {
      this.viewCtrl.dismiss();
      alert(this.idProducto);
    }
    goToEmpresa(params){
        if (!params) params = {};
        this.navCtrl.push(EmpresaPage);
        this.viewCtrl.dismiss();

    }
}
