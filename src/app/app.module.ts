import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BigAppPage } from '../pages/big-app/big-app';
import { ConversacionesPage } from '../pages/conversaciones/conversaciones';
import { PerfilPage } from '../pages/perfil/perfil';
import { SubastaPage } from '../pages/subasta/subasta';
import { MunicipiosPage } from '../pages/municipios/municipios';
import { EmpresasPage } from '../pages/empresas/empresas';
import { ProductosPage } from '../pages/productos/productos';
import { EmpresaPage } from '../pages/empresa/empresa';
import { ChatPage } from '../pages/chat/chat';
import { MapaPage } from '../pages/mapa/mapa';
import { NewSubastaPage } from '../pages/new-subasta/new-subasta';  
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ContactosPage } from '../pages/contactos/contactos';
import { PostVideoPage } from '../pages/post-video/post-video';
import { YoutubePage } from '../pages/youtube/youtube';
import { TextPostPage } from '../pages/text-post/text-post';

import { YoutubeService } from '../services/youtubeService';
import { PublicacionService } from '../services/publicacionService';
import { PedidoService } from '../services/pedidoService';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player'; 
import { ComentariosPage } from '../pages/comentarios/comentarios'; 
import { CategoriasPage } from '../pages/categorias/categorias';
import { ComentariosSubastaPage } from '../pages/comentariosSubasta/comentariosSubasta';
import { NewPostPage } from '../pages/new-post/new-post';
import { FotosPage } from '../pages/fotos/fotos';
import { SocialPage } from '../pages/social/social';
import { UsersPage } from '../pages/users/users';
import { PopoverEmpresaCardPage } from '../pages/big-app/popoverEmpresaCard';
import { MomentModule } from 'angular2-moment';
import { PedidoPage } from '../pages/pedido/pedido';



import { ComentarioService } from '../services/comentarioService';
import { MedioPagoService } from '../services/medioPagoService';
import { PopoverProductoCardPage } from '../pages/big-app/popoverProductoCard'; 
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { GoogleMaps } from '@ionic-native/google-maps'; 

import { UsuarioService } from '../services/usuarioService';
import { AmigoService } from '../services/amigoService';
import { OneSignal } from '@ionic-native/onesignal';  


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http'

import { EmojiProvider } from '../providers/emoji';
import { EmojiPickerComponent } from '../components/emoji-picker/emoji-picker';



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
    TextPostPage,
    CategoriasPage,
    ProductosPage,
    PopoverProductoCardPage,
    EmojiPickerComponent,
    SubastaPage,
    FotosPage,
    PopoverProductoCardPage,
    SocialPage,
    ComentariosSubastaPage,
    NewSubastaPage,
    UsersPage,
    PedidoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MomentModule,
    HttpClientModule,
    NgMasonryGridModule,
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
    TextPostPage,
    PopoverProductoCardPage,
    CategoriasPage,
    ProductosPage,
    PopoverProductoCardPage,
    SubastaPage,
    FotosPage,
    PopoverProductoCardPage,
    SocialPage,
    ComentariosSubastaPage,
    NewSubastaPage,  
    UsersPage,
    PedidoPage       
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
    YoutubeService,
    GoogleMaps,
    OneSignal,
    EmojiProvider,
    AmigoService,
    MedioPagoService,
    PedidoService
  ]
}) 
export class AppModule {}