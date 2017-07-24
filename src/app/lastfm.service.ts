import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, Response} from '@angular/http';
import { AppSettings } from './app.settings';

import { LastFM } from './lastfm';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LastFMService {
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 
                                     'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
    }
    

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private extractData(res: Response) : LastFM {
        let body = res.json();
        console.log('Last.FM responce: ', body);
        return body || { };
    }

    getTackInfo( artist: string, track: string): Promise<LastFM> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('method', 'track.getinfo');
        params.set('api_key', AppSettings.LASTFM_APIKEY.toString());
        params.set('artist', artist);
        params.set('track', track);
        // test with: artist=General+Mumble&track=Appleshake
        //params.set('artist', 'General+Mumble');
        //params.set('track', 'Appleshake');
        params.set('format', 'json');
        this.options = new RequestOptions({ headers: this.headers, search: params });
        
        return this.http.get(AppSettings.LASTFM_APIURL, this.options)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
    }

}