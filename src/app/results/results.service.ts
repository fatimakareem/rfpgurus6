import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
// import { Router, RouterModule,NavigationEnd } from '@angular/router';
// import { AuthHttp, AuthConfig , JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { NgForm } from "@angular/forms";
import { HttpService } from './../serv/http-service';
@Injectable()
export class ResultsService {
    currentUser;

    constructor(private _http: HttpService,private _http5: Http) {
        this.currentUser=JSON.parse(localStorage.getItem('currentUser'));

    }
sortby(obj,order,cat,page,pageSize){
    let headers = new Headers();
    if(localStorage.getItem('currentUser')){
        headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    }
    headers.append('Content-Type', 'application/json');
    // http://192.168.30.132:8000/rf_p/search_with_sort/roo/-1/state/asc?page=1
    return this._http5.get('https://devapis.rfpgurus.com/rf_p/search_with_sort/'+cat +'/'+pageSize+'/'+obj+'/'+order+'?page='+page,
        {headers: headers}).map((response: Response) => response.json());
}
    searchrfprecord(obj,items, page) {

        let headers = new Headers();
        if(localStorage.getItem('currentUser')){
            headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
        }
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://devapis.rfpgurus.com/rf_p/search_id/'+obj+'/'+items+'?page='+page,{headers: headers}).map((response: Response) => response.json());
    }
    toalsearchrecord(obj) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://devapis.rfpgurus.com/rf_p/totalrfp/'+obj+'/10?page=1',
            {headers: headers}).map((response: Response) => response.json());

    }
    downloadFile(id){
        let headers = new Headers();
        if(localStorage.getItem('currentUser')){
            headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
        }
        headers.append('Content-Type', 'application/json');

        return this._http5.get('https://devapis.rfpgurus.com/rf_p/download_file/'+id+'/',
            {headers: headers}).map((response: Response) => response.json());
    }


    usersubscribe(username)
    {
        return this._http5.post('https://devapis.rfpgurus.com/pkg_sub/',{
            'username':username
        }).map((res: Response) => res.json() )
    }
}
