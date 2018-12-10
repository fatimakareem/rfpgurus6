import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
@Injectable()
export class AllCategoryService {
    constructor(private _http: HttpService, private _http5: Http) { }
    loaded: boolean = false;
    rfpcategory() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('https://devapis.rfpgurus.com/rf_p/allcategory/',
            { headers: headers }).map((response: Response) => response.json());
    }
    searchrecord(obj) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://devapis.rfpgurus.com/rf_p/search_category/' + obj + '/',
            { headers: headers }).map((response: Response) => response.json());
    }
}