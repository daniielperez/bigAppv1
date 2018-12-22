import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostVideoPage } from './post-video';

@NgModule({
  declarations: [
    PostVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(PostVideoPage),
  ],
})
export class PostVideoPageModule {}
