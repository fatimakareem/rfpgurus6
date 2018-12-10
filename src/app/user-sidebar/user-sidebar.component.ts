import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from './sidebar.service';
import {SharedData } from './../shared-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { AdvanceService } from '../advance-search/advance.service';
import { FormControl, NgForm, Validators } from '@angular/forms'
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit,OnDestroy {
  cat: any = [];
  state: any = [];
  agency: any=[];

    statsearch;
    catsearch;
    agensearch;

  enterdate;
  duedate;
  agencies;
  states;
  cates;
  status;
  foods = [
  { value: 'active', viewValue: 'Active' },
  { value: 'expire', viewValue: 'Expire' },
  { value: 'all', viewValue: 'All' }
  ];
  local;
  uname;
  endRequest;
    constructor(private datePipe: DatePipe,public _shareData: SharedData,private _nav: Router, private _serv: SidebarService, private _adserv: AdvanceService) {
    }

    formclear() {
      this.status = undefined;
      this.enterdate = undefined;
      this.duedate = undefined;
      this.states = undefined;
      this.agencies=undefined;
      this.cates = undefined;
      delete this.enterdate;
      delete this.duedate;
  
    }
    onSubmit(F: NgForm) {
      console.log(F)
        if (F.valid == true) {
            let searchUrl = 'find-bids';
            console.log(this.datePipe.transform(this.enterdate, "yyyy-MM-dd"))
            this._nav.navigate([searchUrl], {
                queryParams: {
                    status: this.status,
                    enterdate: this.datePipe.transform(this.enterdate, "yyyy-MM-dd h:mm:ss a "),
                    duedate: this.datePipe.transform(this.duedate, "yyyy-MM-dd h:mm:ss a "),
                    state: this.states,
                    agency: this.agencies,
                    cat: this.cates
                }
            });
        }
    }
    
  catRfp(item) {
    console.log("junaid",item);
    this._shareData.categoryInfo(item);
    this.formclear();         
    let sth = 'category';
    // sth=sth.replace(/&/g,'and').replace(/\s+/g, '-').toLowerCase();
    this._nav.navigate([sth], { queryParams: { cat: item } });
  }
  
  rfpState(state) {
    console.log("sssssssssssssss", state);
    this._shareData.stateInfo(state); 
    this.formclear();         
            
    let sth = 'state';
    // sth=sth.replace(/&/g,'and').replace(/\s+/g, '-').toLowerCase();
    this._nav.navigate([sth], { queryParams: { state: state, } });
  }
  
  ngOnInit() {

this.endRequest= this._adserv.rfpstate().subscribe(
  data => {
  this.state = data.Result;
  console.log(this.state);
  },
  error => {
  // console.log(error);
  });
  this.endRequest=this._adserv.rfpcategory().subscribe(
  data => {
  this.cat = data;
  // console.log(data);
  },
  error => {
  // console.log(error);
  }
  )
      this.endRequest=this._adserv.rfpagency().subscribe(
          data=>{
              this.agency=data.Result;
              console.log(this.agency);
          }
      )


  }
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username

      return true
    }
    else {
      return false
    }

  }
  ngOnDestroy(){
    this.endRequest.unsubscribe();
  }
}
