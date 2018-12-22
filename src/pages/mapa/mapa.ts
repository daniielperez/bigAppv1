import { Component,OnInit } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { EmpresaService } from '../../services/empresaService';
import { DomSanitizer } from '@angular/platform-browser';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  // CameraPosition,
  // MarkerOptions,
  // Marker
} from '@ionic-native/google-maps';

@Component({ 
  selector: 'page-mapa', 
  templateUrl: 'mapa.html',
  providers: [ 
    EmpresaService,
  ],
})
export class MapaPage implements OnInit{
  errorMessage:any;
  empresa:any = false;
  publicaciones:any = false;
  spiner:any=false; 
  myStyles:any=false;  
  map: GoogleMap;

  
  constructor(public navCtrl: NavController,public navParams: NavParams, public _EmpresaService: EmpresaService,public sanitizer: DomSanitizer) {
    
      
  }  
  ngOnInit() {  
    
  }
  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.navParams.get('lat'),
          lng: this.navParams.get('lng')
        },
        zoom: 18,
        tilt: 30
      }
    };
    let mapData = document.getElementById('map_canvas');

    this.map = GoogleMaps.create(mapData, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.map.addMarker({
        title: this.navParams.get('nombreEmpresa'),
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: this.navParams.get('lat'),
          lng: this.navParams.get('lng')
        }
       // position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });

  }
 
}
