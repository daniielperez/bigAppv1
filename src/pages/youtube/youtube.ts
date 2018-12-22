import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


/**
 * Generated class for the YoutubePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-youtube',
  templateUrl: 'youtube.html',
})
export class YoutubePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private youtube: YoutubeVideoPlayer) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YoutubePage');
  }

}
