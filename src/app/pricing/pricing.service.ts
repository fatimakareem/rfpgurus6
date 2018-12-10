import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms'
@Injectable()
export class PricingService {
    currentUser;
    constructor(private _http5: HttpService ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    get_card_info() {
        if(localStorage.getItem('currentUser')){
        let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://devapis.rfpgurus.com/payment/cardinfo/', { headers: headers }).map((response: Response) => response.json());
    }}
    loaded: boolean = false;
    login(username: string, password: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.post('https://devapis.rfpgurus.com/user-token-auth/',
            JSON.stringify({ username: username, password: password }), { headers: headers })
            .map((response: Response) => {
                let user = { username: username, token: response.json().token };
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log(localStorage.getItem('currentUser'))
                }
            });
    }
    login_authenticate(username) {
        return this._http5.post('https://devapis.rfpgurus.com/ac_login/', {
            'username': username
        }).map((res: Response) => res.json())
    }
    post_service(obj) {
        console.log('service');
        console.log(obj);
        return this._http5.post("https://devapis.rfpgurus.com/register/", {
            'obj': obj
        }).map((res: Response) => res.json());
    }
    activation_service(email) {
        console.log(email);
        return this._http5.post("https://devapis.rfpgurus.com/ac_code/", {
            'email': email
        }).map((res: Response) => res.json())
    }
    authenticate_service(uid) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://devapis.rfpgurus.com/activate/' + uid,
            { headers: headers }).map((response: Response) => response.json());
    }
    forget_password(email) {
        return this._http5.post('https://devapis.rfpgurus.com/forget_password/', {
            'email': email
        }).map((res: Response) => res.json())
    }
    change_password(pass1, pass2, code) {
        return this._http5.post('https://devapis.rfpgurus.com/change_password/', {
            'pass1': pass1,
            'pass2': pass2,
            'code': code,
        }).map((res: Response) => res.json())
    }
    package_free(status,id,username, pkgdetail) {

        let headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
        headers.append('Content-Type', 'application/json');
        if(status == false){
        // if (pkgdetail.type == 'F') {
        //     return this._http5.post("https://devapis.rfpgurus.com/package/",
        //         JSON.stringify({
        //             'username': username,
        //             'pricepackage': pkgdetail.type,
        //             'duaration': pkgdetail.dur
        //         }),
        //         { headers: headers }).map((res: Response) => res.json())
        // }
        // else {
            return this._http5.post("https://devapis.rfpgurus.com/package/",
                JSON.stringify({
                    'username': username,
                    'pricepackage': pkgdetail.type,
                    'duration': pkgdetail.dur,
                    'creditno': pkgdetail.credit,
                    'exp': pkgdetail.expdate,
                    'ccv': pkgdetail.ccv
                    
                }),
                { headers: headers }).map((res: Response) => res.json())
        // }
    }
        else if(status == true){
            return this._http5.post("https://devapis.rfpgurus.com/package/",
            JSON.stringify({
               
                "id":id,
                "username":username,
                "pricepackage":pkgdetail.type,
                "duration": pkgdetail.dur
            }),
            { headers: headers }).map((res: Response) => res.json())
        }
    }
    updateCard(var_status,id, name, cardno, ccv, expiryDate, address, zip, city, state, country,set_auto_pay) {
        let header = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        header.append('Content-Type', 'application/json');
        return this._http5.put('https://devapis.rfpgurus.com/payment/cardinfo/',
          JSON.stringify({
            // "cardNumber": cardno,
            "default": var_status,
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
            "autopay": set_auto_pay
          }),
          { headers: header }).map((response: Response) => response.json());
      }
}
