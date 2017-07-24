import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Icecast } from './icecast';
import { AppSettings } from './app.settings';

@Injectable()
export class IcecastService {
    private icecastURL = AppSettings.ICECAST_APIURL + '/status-json.xsl'; 
    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private extractData(res: any) : Icecast {
        let body = res.json();
        return body.icestats || { };
    }
    private headers = new Headers({'Content-Type': 'application/json'});

    getIcecast(): Promise<Icecast> {
        return this.http.get(this.icecastURL)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
    }

}