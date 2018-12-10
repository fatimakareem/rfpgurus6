import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
@Injectable()
export class UnsubscribeService {

  constructor(private http: Http) { }
  unsub(uid) {
    console.log(uid)
    let headers = new Headers();
    return this.http.delete('https://devapis.rfpgurus.com/unsubscribe/' + uid +'/', { headers: headers }).map((response: Response) => response.json());
}
qurey(uid,comment) {
  console.log(uid)
  let headers = new Headers();
  return this.http.post('https://devapis.rfpgurus.com/unsubscribe_query/',{
    "email":uid,
"comment":comment
}, { headers: headers }).map((response: Response) => response.json());
}
}
