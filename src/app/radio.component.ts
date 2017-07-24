import { Component, Input, OnChanges, OnInit} from '@angular/core';

import { LastFMService } from './lastfm.service';
import { Source } from './source';
import { LastFM } from './lastfm';
import { AppSettings } from './app.settings';

@Component( { 
    selector: 'radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.css']
} )

export class RadioComponent implements OnChanges, OnInit{
    @Input() source: Source;
    private audioPlayer: any;
    private isPlaying: boolean = false;
    private currentMount: string;
    private lastFMresponce: LastFM;
    private currentSource: Source;
    private album_art: string;

    constructor ( private lastFMService: LastFMService) {}

    togglePlayer(): void {
        if(!this.audioPlayer.paused){
            this.audioPlayer.pause();
            this.isPlaying = false;
        }else{
            this.audioPlayer.play();
            this.isPlaying = true;
        }
    }

    getAlbumArt(artist: string, track: string) : void {
        this.lastFMService.getTackInfo(artist, track).then( 
            lastfm => {
                this.lastFMresponce = lastfm;
                this.album_art = AppSettings.DEFAULT_ALBUM_ART;

                if(this.lastFMresponce.error){
                    console.log('Error: ', this.lastFMresponce.message);
                }else{
                    console.log(this.lastFMresponce.track["album"]);
                    if(this.lastFMresponce.track["album"]){
                        if(this.lastFMresponce.track["album"].image.length > 0){
                            //get last (largest) image
                            var imgIndex = this.lastFMresponce.track["album"].image.length -1;
                            var art_url = this.lastFMresponce.track.album.image[imgIndex]['#text'];
                            if(art_url){
                                this.album_art = art_url;
                            }else{
                                console.log('lastfm returned blank album art!');
                            }
                        }
                    }
                }
            }
        );
    }

    ngOnInit(): void {
        if(!this.audioPlayer){
            this.audioPlayer = new Audio();
            this.audioPlayer.crossOrigin = "anonymous";
            this.audioPlayer.loop = false;
            this.audioPlayer.autoplay = true;
            this.isPlaying = true;
        }
    }

    ngOnChanges(): void {

        if (this.source){
            //make sure this.currentSource is defined
            if(!this.currentSource){
                this.currentSource = this.source;
                //update album art
                this.getAlbumArt(this.source.artist, this.source.title);
            }
            if(this.currentMount != this.source.server_name){
                //switching to new mount
                this.currentMount = this.source.server_name;

                //update audio player
                this.audioPlayer.src = this.source.listenurl;
                this.audioPlayer.pause();
                this.audioPlayer.load();
                if (this.isPlaying){
                    this.audioPlayer.play();
                }
            }
            if(this.source.artist != this.currentSource.artist || this.source.title != this.currentSource.title){
                //update album art
                this.getAlbumArt(this.source.artist, this.source.title);
                this.currentSource = this.source;
            }
        }
    }
}