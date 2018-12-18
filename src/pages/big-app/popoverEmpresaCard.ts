import { Component } from '@angular/core';
import { NavController, ViewController,NavParams  } from 'ionic-angular';


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">Learn Ionic</button>
      <button ion-item (click)="close()">Documentation</button>
      <button ion-item (click)="close()">Showcase</button>
      <button ion-item (click)="close()">GitHub Repo</button>
    </ion-list>
  `
})
export class PopoverEmpresaCardPage {
  idEmpresa:any = this.navParams.get('key1');

  constructor(public navCtrl: NavController,public viewCtrl: ViewController,public navParams: NavParams) {
  }
  close() {
    this.viewCtrl.dismiss();
    alert(this.idEmpresa);
  }
 
}
