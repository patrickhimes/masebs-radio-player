import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Icecast } from './icecast';
import { Source } from './source';
import { IcecastService } from './icecast.service';

@Component( { 
    selector: 'mounts',
    templateUrl: './mounts.component.html',
    styleUrls: ['./mounts.component.css']
} )

export class MountsComponent implements OnInit{

    icecast: Icecast;
    sources: Source[];
    selectedSource: Source;

    constructor ( private icecastService: IcecastService) {}

    onSelect(source: Source): void {
        this.selectedSource = source;
    }

    getIcecast() : void {
        this.icecastService.getIcecast().then( 
            icecast => {
                this.icecast = icecast;
                this.sources = [].concat(this.icecast.source);
                if(this.selectedSource){
                    //update selected source data
                    for( let sourceData of this.sources){
                        if(sourceData.server_name == this.selectedSource.server_name){
                            this.selectedSource = sourceData;
                        }
                    }
                }else{
                    // select first source
                    this.selectedSource = this.sources[0];
                }
            }
        );
    }

    ngOnInit(): void {
        this.getIcecast();
        Observable.interval(6000).subscribe(x => {
            this.getIcecast();
        });
    }

}