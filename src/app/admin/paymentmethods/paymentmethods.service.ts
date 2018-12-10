import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
@Injectable()
export class PaymentmethodsService {
  currentUser;
  constructor(private http: HttpService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  addCard(status, name, address, zip, city, state, country, cardno, ccv, expiryDate,var_type_atm,setautopay) {
    let header = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    header.append('Content-Type', 'application/json');
    return this.http.post('https://devapis.rfpgurus.com/payment/cardinfo/',
      JSON.stringify({
        "default": status,
        "name": name,
        // "pinCode": pin,
        "street_address": address,
        "zipcode": zip,
        "city": city,
        "state": state,
        "country": country,
        "number": cardno,
        "cvc": ccv,
        "expDate": expiryDate,
        "card_type":var_type_atm,
        "autopay":setautopay
      }),
      { headers: header }).map((response: Response) => response.json());
  }
  showCards() {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://devapis.rfpgurus.com/payment/cardinfo/', { headers: headers }).map((response: Response) => response.json());
  }
  updateCard(status,autopay, id, name, cardno, ccv, expiryDate, address, zip, city, state, country) {
    let header = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    header.append('Content-Type', 'application/json');
    return this.http.put('https://devapis.rfpgurus.com/payment/cardinfo/',
      JSON.stringify({
        // "cardNumber": cardno,
        "default": status,
        "cid": id,
        "name": name,
        // "pinCode": pin,
        "street_address": address,
        "zipcode": zip,
        "city": city,
        "state": state,
        "country": country,
        "number": cardno,
        "cvc": ccv,
        "expDate": expiryDate,
        "autopay":autopay
      }),
      { headers: header }).map((response: Response) => response.json());
  }
  deleteCard(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete('https://devapis.rfpgurus.com/payment/cardinfodelete/' + id, { headers: headers }).map((response: Response) => response.json());
  }
  Atm_card_exist(card) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    // alert(JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://devapis.rfpgurus.com/payment/cardnoexist/',
      JSON.stringify({
        'number': card
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}