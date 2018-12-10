import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { PricingService } from './pricing.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { RfpService } from '../rfps/single-rfp/rfp.service';
import { PaymentmethodsService } from 'app/admin/paymentmethods/paymentmethods.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricingsteps.component.scss'],
  providers: [PricingService, RfpService]
})
export class PricingComponent implements OnInit {
  /////////////////////////////card///////////////////////////
  public mask = [/\d/, /\d/, /\d/, /\d/];
  public mask1 = [/[a-zA-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/];
  cardnumber1;
  cardnumber2;
  cardnumber3;
  cardnumber4;
  cardholdername;
  expmonth;
  expyear;
  ccv;
  default: boolean = false;
  personal: any = [];
  flipclass = 'credit-card-box';
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step1class = 'active';
  step2class = '';
  step3class = '';
  authcode = '';
  fullname = '';
  pass = '';
  retypepass = '';
  passnotequal = false;
  email;
  pricepackage = [];
  user_id;
  payment_result;
  showresponse = false;
  loading = false;
  emailconfirmerror = false;
  other = false;
  free = false;
  pkg_detail = {};
  pkgsub = false;
  info = false;
  card = false;
  pkg;
  local;
  uname;
  endRequest;
  message;
  var_get_card_id;
  /////////////////////////////end///////////////////////////
  constructor(private route: ActivatedRoute, private _serv1: RfpService, private _nav: Router, private _serv: PricingService, private http: Http, private _http6: PaymentmethodsService) { }
  //
  next_stepdetail(event: any) {
    if (event.target.value == "BM") {
      this.prv_stepdetail("B", "M")
    } else if (event.target.value == "PY") {
      this.prv_stepdetail("P", "Y")
    }
  }
  getCards() {
    if (localStorage.getItem('currentUser')) {
      this.endRequest = this._serv.get_card_info().subscribe(Data => {
        this.res = Data;
        this.message = Data.message;
      },
        error => {
          // if (error.status == 404) {
          //   swal({
          //     type: 'error',
          //     title: 'Credit Card Not Found!',
          //     showConfirmButton: false,
          //     timer: 1500
          //   })
          // }
          // else if (error.status == 500) {
          //   swal(
          //     'Sorry',
          //     'Server Is Under Maintenance!',
          //     'error'
          //   )
          // }
        })
    }
  }
  setdefault() {
    this.default = false;
  }
  valuee = '';
  firststep(value) {
    console.log(value)
    this.valuee = value;
    if (value == "BM") {
      this.prv_stepdetail("B", "M")
    }
    else if (value == "PY") {
      this.prv_stepdetail("P", "Y")
    }
  }
  prv_stepdetail(type, dur) {
    this.pkg_detail['type'] = type
    this.pkg_detail['dur'] = dur
    this.pkgsub = true;
  }
  ////////////////////////////////////Card Module//////////////////////////////////
  proceedstep1() {
    this.loading = true;
  }
  flip() {
    this.flipclass = 'credit-card-box hover';
  }
  flipagain() {
    this.flipclass = 'credit-card-box';
  }
  pay() {
    if (this.free) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://ns519750.ip-158-69-23.net:8100/cr/',
        JSON.stringify({
          email: this.email, pricepackage: this.pricepackage[0],
          duration: this.pricepackage[1]
        }), { headers: headers })
        .map((response: Response) => {
        });
    } else {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://ns519750.ip-158-69-23.net:8100/cr/',
        JSON.stringify({
          creditno: this.cardnumber1 + this.cardnumber2 +
            this.cardnumber3 + this.cardnumber4, exp: this.expmonth + '/' + this.expyear,
          ccv: this.ccv, name: this.cardholdername,
          id: this.user_id, pricepackage: this.pricepackage[0],
          duration: this.pricepackage[1]
        }), { headers: headers })
        .map((response: Response) => {
          this.payment_result = response.json();
          console.log(this.payment_result);
        });
    }
  }
  proceed() {
   
    this.pkg_detail['credit'] = this.cardnumber1 + this.cardnumber2 +
      this.cardnumber3 + this.cardnumber4
    this.pkg_detail['ccv'] = this.ccv
    this.pkg_detail['expdate'] = this.expmonth + '/' + this.expyear
    this.local = localStorage.getItem('currentUser');
    let pars = JSON.parse(this.local);
    this.uname = pars.username
    this._serv.package_free(this.set, this.id, this.uname, this.pkg_detail).subscribe(
      data => {
        swal(
          'Your payment has been transferred',
          '',
          'success'
        )
      },
      error => {
        swal(
          'Oops...',
          'Something went wrong!',
          'error'
        )
      });
  }
  gotocreditcard() {
    this.emailconfirmerror = false;
    this.checkcode(this.authcode)
      .subscribe(
        data => {
          this.step1 = false;
          this.step2 = true;
          this.step1class = '';
          this.step2class = 'active';
        },
        error => {
          console.log(error);
          console.log(error);
          this.emailconfirmerror = true;
        });
  }
  checkcode(key) {
    console.log(key);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://ns519750.ip-158-69-23.net:8100/verify/email/',
      JSON.stringify({
        email: this.email,
        key: key
      }), { headers: headers })
      .map((response: Response) => {
      });
  }
  saveaccountdetail() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://ns519750.ip-158-69-23.net:8100/create/account/',
      JSON.stringify({
        email: this.email,
        name: this.fullname,
        password: this.pass
      }), { headers: headers })
      .map((response: Response) => {
        console.log(response);
        this.user_id = response.json().user_id;
        console.log(this.user_id);
      });
  }
  // step 2 done
  gotocheckout() {
    if (this.pass === this.retypepass) {
      if (this.free) {
        this.proceed();
        this.saveaccountdetail()
          .subscribe(
            data => { },
            error => {
              // this.loading = false;
            });
      } else {
        this.saveaccountdetail()
          .subscribe(
            data => {
              this.passnotequal = false;
              this.step2 = false;
              this.step3 = true;
              this.step2class = '';
              this.step3class = 'active';
              console.log('Account details submitted', true);
            },
            error => {
              // this.loading = false;
            });
      }
    } else {
      this.passnotequal = true;
    }
  }
  chkpass() {
    if (this.pass === this.retypepass) {
      this.passnotequal = false;
    }
  }
  ///////////////////////////////////END//////////////////////////////////////////
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      return false
    }
    else {
      return true
    }
  }
  res;
  status;
  get_card_number;
  file;
  id;
  get_card_value1;
  get_card_value2;
  get_card_value3;
  get_card_value4;
  ex_value1 = [];
  ex_get_value;
  ex_month_value;
  ex_year_value;
  value_2;
  subscribe;
  notsubscribe;
  set;
  show_card_info() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this._serv1.usersubscribe(JSON.parse(localStorage.getItem('currentUser')).username).subscribe(
        data => {
          this.subscribe = data.Response
          // console.log(data.Response);
        },
        error => {
          this.notsubscribe = error.status;
          console.log(this.notsubscribe);
          if (localStorage.getItem('currentUser') && this.notsubscribe == 406) {
            return this._serv.get_card_info()
              .subscribe(response => {
            for (let i of this.res) {
            if(i.default == true){
                this.status = i;
                this.set=i.default
                console.log(this.status);
                this.get_card_number = this.status.cardNumber;
              this.get_card_value1 = this.get_card_number.toString().slice(0, 4);
              this.get_card_value2 = this.get_card_number.toString().slice(4, 8);
              this.get_card_value3 = this.get_card_number.toString().slice(8, 12);
              this.get_card_value4 = this.get_card_number.toString().slice(12, 16);
              this.cardnumber1 = this.get_card_value1;
              this.cardnumber2 = this.get_card_value2;
              this.cardnumber3 = this.get_card_value3;
              this.cardnumber4 = this.get_card_value4;
              this.ex_get_value = this.status.expiryDate;
              this.ex_value1 = this.ex_get_value.split("/");
              this.ex_month_value = this.ex_value1[0];
              this.ex_year_value = this.ex_value1[1];
              this.cardholdername = this.status.nickname;
              this.expmonth = this.ex_month_value;
              this.expyear = this.ex_year_value;
              this.ccv = this.status.ccv;
              this.id = this.status.id
            } else if(i.default == false) {
             this.set=false;
              this.get_card_number = '';
              this.get_card_value1 = '';
              this.get_card_value2 = '';
              this.get_card_value3 = '';
              this.get_card_value4 = '';
              this.cardnumber1 = '';
              this.cardnumber2 = '';
              this.cardnumber3 = '';
              this.cardnumber4 = '';
              this.ex_get_value = '';
              this.ex_value1 = null;
              this.ex_month_value = '';
              this.ex_year_value = '';
              this.cardholdername = '';
              this.expmonth = '';
              this.expyear = '';
              this.ccv = '';
              this.id = ''
            }
            }
            
            })
          }
        }
      );
    }

  }

  keyPresszip(event: any) {
    const pattern = /[0-9+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();

    }
  }
  keyPressnamezip(event: any) {
    const pattern = /^[a-zA-Z _.]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();

    }

  }

  updefault;
  setcard(status, var_get_card_id, name, number, cvc, expDate, street_address, zipcode, city, state, country,autopay) {
    if (status == false) {
      this.updefault = true;
    }
    else if (status == true) {
      this.updefault = false;
    }

    this.endRequest = this._serv.updateCard(this.updefault, var_get_card_id, name, number, cvc, expDate, street_address, zipcode, city, state, country,autopay).subscribe(Data => {
      // swal({
      //   type: 'success',
      //   title: 'Credit Card Details Are Updated!',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
      this.show_card_info();
      this.getCards();
    },
      error => {
        if (error.status == 400) {
          swal({
            type: 'error',
            title: 'Credit Card Details Are Not Correct!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server Is Under Maintenance!',
            'error'
          )
        }
        else {
          swal(
            'Sorry',
            'Some Thing Went Worrng!',
            'error'
          )
        }
      })
  }
  var_auto_pay;
  setautopay(var_status, var_get_card_id, name, number, cvc, expDate, street_address, zipcode, city, state, country, setautopay) {
    //alert(setautopay);
    if (setautopay == false) {
      this.var_auto_pay = true;
      // alert(this.var_auto_pay);
    }
    else if (setautopay == true) {
      this.var_auto_pay = false;
      // alert(this.var_auto_pay);
    }

    this.endRequest = this._serv.updateCard(var_status, var_get_card_id, name, number, cvc, expDate, street_address, zipcode, city, state, country, this.var_auto_pay).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Auto Pay Payment Method Is Successfully Apply On This Card',
        showConfirmButton: false,
        timer: 1500
      })
      this.show_card_info();
      this.getCards();
    },
      error => {
        if (error.status == 400) {
          swal({
            type: 'error',
            title: 'Credit Card Details Are Not Correct!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server Is Under Maintenance!',
            'error'
          )
        }
        else {
          swal(
            'Sorry',
            'Some Thing Went Worrng!',
            'error'
          )
        }
      })
  }
  ngOnInit() {
    this.show_card_info();
    this.getCards();
    this.route.queryParams

      .subscribe(params => {
        this.firststep(params.value)
        // if (params.value == "BM") {
        //   this.prv_stepdetail("B", "M")
        // }
        // else if (params.value == "PY") {
        //   this.prv_stepdetail("P", "Y")
        // }
      })
  }
}
