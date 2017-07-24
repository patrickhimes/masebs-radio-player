import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MountsComponent } from './mounts.component';
import { RadioComponent } from './radio.component';
import { VisualizerComponent } from './visualizer.component';
import { IcecastService } from './icecast.service';
import { LastFMService } from './lastfm.service';

@NgModule({
  declarations: [
    AppComponent, 
    MountsComponent, 
    RadioComponent, 
    VisualizerComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule,
  ],
  providers: [
    IcecastService, 
    LastFMService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
