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
import { NewPostPage } from '../pages/new-post/new-post';
import { PostVideoPage } from '../pages/post-video/post-video';
import { YoutubePage } from '../pages/youtube/youtube';
import { TextPostPage } from '../pages/text-post/text-post';
import { PopoverEmpresaCardPage } from '../pages/big-app/popoverEmpresaCard';
import { MomentModule } from 'angular2-moment';

import { UsuarioService } from '../services/usuarioService';
import { YoutubeService } from '../services/youtubeService';
import { ComentarioService } from '../services/comentarioService';
import { PublicacionService } from '../services/publicacionService';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

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
    PopoverEmpresaCardPage,
    NewPostPage,
    PostVideoPage,
    YoutubePage,
    TextPostPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MomentModule,
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
    PopoverEmpresaCardPage,
    NewPostPage,
    PostVideoPage,
    YoutubePage,
    TextPostPage
  ],
  providers: [
    StatusBar,  
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioService,
    ComentarioService,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    PublicacionService,
    YoutubeVideoPlayer,
    YoutubeService
  ]
})
export class AppModule {}