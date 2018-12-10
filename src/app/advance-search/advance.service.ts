import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';
@Injectable()
export class AdvanceService {
  currentUser;
  constructor(private _http: HttpService, private _http5: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  searchrecord(obj) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http5.get('https://devapis.rfpgurus.com/rf_p/search_id/' + obj + '/',
      { headers: headers }).map((response: Response) => response.json());
  }
  rfpstate() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http5.get('https://devapis.rfpgurus.com/rf_p/allstate/',
      { headers: headers }).map((response: Response) => response.json());
  }
  rfpcategory() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http5.get('https://devapis.rfpgurus.com/rf_p/allcategory/',
      { headers: headers }).map((response: Response) => response.json());
  }
  rfpcity() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http5.get('https://devapis.rfpgurus.com/allcites/',
      { headers: headers }).map((response: Response) => response.json());
  }
  rfpcounty() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http5.get('https://devapis.rfpgurus.com/allcounty/',
      { headers: headers }).map((response: Response) => response.json());
  }
  rfpagency() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('https://devapis.rfpgurus.com/rf_p/allagency/',
      { headers: headers }).map((response: Response) => response.json());
  }
  downloadFile(id) {
    let headers = new Headers();
    if (this.currentUser) {
      headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    }
    headers.append('Content-Type', 'application/json');
    return this._http5.get('https://devapis.rfpgurus.com/rf_p/download_file/' + id + '/',
      { headers: headers }).map((response: Response) => response.json());
  }
  searchrfprecord(Rfpnum, title, status, enterdate, duedate, state, agency, cat, items, page) {
    let headers = new Headers();
    if (this.currentUser) {
      headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    }
    headers.append('Content-Type', 'application/json');
    return this._http.put('https://devapis.rfpgurus.com/rf_p/filters/' + items + '/?page=' + page,
      JSON.stringify({
        "rfp_key": Rfpnum,
        "title": title,
        "status": status,
        "posted_from": enterdate,
        "posted_to": duedate,
        "state": state,
        "agency": agency,
        "category": cat
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  usersubscribe(username) {
    return this._http5.post('https://devapis.rfpgurus.com/pkg_sub/', {
      'username': username
    }).map((res: Response) => res.json())
  }
}
