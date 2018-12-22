import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { EmpresaPage } from '../empresa/empresa';
import { MapaPage } from '../mapa/mapa';


@Component({
  template: `
    <ion-list>
      <button ion-item on-click="goToEmpresa()">Visita empresa</button>
      <button ion-item (click)="goToNavigate()">Como llegar</button>
      <button ion-item (click)="close()">Dialogo</button>
    </ion-list>
  `
})
export class PopoverProductoCardPage {

    lat:any = this.navParams.get('lat');
    lng:any = this.navParams.get('lng');
    label:any = this.navParams.get('label');

    constructor(public navCtrl: NavController,public viewCtrl: ViewController,public navParams: NavParams) {
    }

    close() {
      this.viewCtrl.dismiss();
      alert(3); 
    }

    goToEmpresa(){
      this.navCtrl.push(EmpresaPage);
      this.viewCtrl.dismiss();
    }
    
    goToNavigate(){
      
      this.navCtrl.push(MapaPage, {
        lat: this.lat, 
        lng: this.lng,
        nombre: this.label
      });
      this.viewCtrl.dismiss();

    }
}
