import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoEmpresaPage } from './pedido-empresa';

@NgModule({
  declarations: [
    PedidoEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoEmpresaPage),
  ],
})
export class PedidoEmpresaPageModule {}
