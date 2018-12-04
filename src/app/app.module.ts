import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BigAppPage } from '../pages/big-app/big-app';
import { ConversacionesPage } from '../pages/conversaciones/conversaciones';
import { PerfilPage } from '../pages/perfil/perfil';
import { MunicipiosPage } from '../pages/municipios/municipios';
import { EmpresasPage } from '../pages/empresas/empresas';
import { EmpresaPage } from '../pages/empresa/empresa';
import { ChatPage } from '../pages/chat/chat';
import { MapaPage } from '../pages/mapa/mapa';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ContactosPage } from '../pages/contactos/contactos';
import { ComentariosPage } from '../pages/comentarios/comentarios';
import { PopoverEmpresaCardPage } from '../pages/big-app/popoverEmpresaCard';

import { UsuarioService } from '../services/usuarioService';
import { ComentarioService } from '../services/comentarioService';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    BigAppPage,
    ConversacionesPage,
    PerfilPage,
    MunicipiosPage,
    EmpresasPage,
    EmpresaPage,
    ChatPage,
    MapaPage,
    LoginPage,
    SignupPage,
    ContactosPage,
    ComentariosPage,
    PopoverEmpresaCardPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BigAppPage,
    ConversacionesPage,
    PerfilPage,
    MunicipiosPage,
    EmpresasPage,
    EmpresaPage,
    ChatPage,
    MapaPage,
    LoginPage,
    SignupPage,
    ContactosPage,
    ComentariosPage,
    PopoverEmpresaCardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioService,
    ComentarioService
  ]
})
export class AppModule {}