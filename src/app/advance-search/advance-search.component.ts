import { Component, OnInit, Input, OnDestroy, AfterContentInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdvanceService } from './advance.service';
import { MatPaginatorModule } from '@angular/material';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
// import {DatePipe} from '@angular/common';
declare var $: any;
import { HeaderService } from '../header/header.service';
import { SpeechRecognitionService } from '../header/speechservice';
import { SharedData } from '../shared-service';
import { PagerService } from '../rfps/rfp/paginator.service';
// import { DateFormat } from './date-format';
import * as moment from 'moment';
@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css'],
  providers: [PagerService, AdvanceService, SharedData, HeaderService, SpeechRecognitionService]
})
export class AdvanceSearchComponent implements OnInit, OnDestroy {
  public blink = false;
  @Output() spokenText = new EventEmitter<string>();
  @Output() error = new EventEmitter<string>();
  @Input() showInput = true;
  endRequest;
  pager: any = {};
  state: any = [];
  cat: any = [];
  agency: any = [];
  startIndex;
  catValue = '';
  stateValue = '';
  category;
  stateval;
  item;
  posted = '';
  enter;
  record: any = [];
  local;
  uname;
  subscribe;
  search: boolean = false;
  enterdate;
  duedate;
  states;
  agencies;
  cates;
  status = "active";
  catsearch;
  agensearch;
  statsearch;
  postedDate;
  DueDate;
  foods = [
    { value: 'active', viewValue: 'Active' },
    { value: 'expire', viewValue: 'Expired' },
    { value: 'all', viewValue: 'All' }
  ];
  datashow: boolean = false;
  filtertext;
  constructor(private speech: SpeechRecognitionService, public _shareData: SharedData, private _serv1: HeaderService, private pagerService: PagerService, private route: ActivatedRoute, private _nav: Router, private _serv: AdvanceService) {
  }
 
  // MatPaginator Inputs
  length = 0;
  // click = 1;
  pageSize = '10';
  pageSizeOptions = [10, 20, 35, 50];
  Rfpnum;
  title;
  // MatPaginator Output
  pageEvent: PageEvent;
  download(info) {
    this.endRequest = this._serv.downloadFile(info).subscribe(
      data => {
        if (data.status = "200") {
          swal(
            'File Downloaded Successfully!',
            '',
            'success'
          )
        }
      },
      error => {
      });
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  posted_date() {
    this.enter = this.posted
  }
  cat_value() {
    this.category = this.catValue
  }
  state_value() {
    this.stateval = this.stateValue
  }
  chang(status) {
    this.status = status;
    this.onSubmit(1);
  }
  entereddate(enterdate){
    // if (enterdate == 'Invalid Date') {
    //   delete this.enterdate;
    //   delete this.postedDate
    //   this.onSubmit(1);
    // }
   if(enterdate) {
      this.postedDate = moment(enterdate).format('YYYY-MM-DD');
      this.onSubmit(1);
    }
    else{
      delete this.enterdate;
   delete this.postedDate;
   this.onSubmit(1);
    }
  }
  dueddate(duedate){
    // if (duedate == 'Invalid Date') {
    //   delete this.DueDate;
    //   delete this.duedate;
    //   this.onSubmit(1);
    // }
    if(duedate) {
      this.DueDate = moment(duedate).format('YYYY-MM-DD');
      this.onSubmit(1);
    }else{
      delete this.DueDate;
     delete this.duedate;
     this.onSubmit(1);
    }

  }
  onSubmit(page) {
    if (this.states) {
  //     if (this.enterdate == 'Invalid Date') {
  //       delete this.enterdate;
  //       delete this.postedDate
  //     }
  // if (this.enterdate) {
  //       this.postedDate = moment(this.enterdate).format('YYYY-MM-DD');
  //     }
      // if (this.duedate == 'Invalid Date') {
      //   delete this.DueDate;
      //   delete this.duedate;
      // }
      // if (this.duedate) {
      //   this.DueDate = moment(this.duedate).format('YYYY-MM-DD');
      // }
      // this.search = false;
      // if( this.DueDate == null){
      //   delete this.DueDate
      // }
      // if(this.postedDate == null){
      //   delete this.postedDate
      // }
     
      this._serv.searchrfprecord(this.Rfpnum, this.title, this.status, this.postedDate, this.DueDate, this.states, this.agencies, this.cates, this.pageSize, page).subscribe(
        data => {
          this.record = "";
          this.item = "";
          this.record = data.Results;
          this.item = data.TotalResult;
          this.length = this.item;
          this.pager = this.pagerService.getPager(this.item, page,this.pageSize);
        },
        error => {
          this.search = true;
          this.datashow = true;
          this.record.splice(0, this.record.length);
          this.length = 0;
        });
    }
    else {
      this.route.queryParams
        .subscribe(params => {
          this.states = params.state;
          console.log("sdsdfffff", this.enterdate, this.duedate)
        //   if (this.enterdate == 'Invalid Date') {
        //     delete this.postedDate;
        //     delete this.enterdate;
        //   }
        //   if (this.enterdate) {
        //     this.postedDate = moment(this.enterdate).format('YYYY-MM-DD');
        //   }
        //   if (this.duedate == 'Invalid Date') {
        //     delete this.DueDate;
        //     delete this.duedate;
        //   }
        //  if (this.duedate) {
        //     this.DueDate = moment(this.duedate).format('YYYY-MM-DD');
        //   }
        //   if( this.DueDate == null){
        //     delete this.DueDate
        //   }
        //   if(this.postedDate == null){
        //     delete this.postedDate
        //   }
          this.search = false;
         
          this._serv.searchrfprecord(this.Rfpnum, this.title, this.status, this.postedDate, this.DueDate, this.states, this.agencies, this.cates, this.pageSize, page).subscribe(
            data => {
              this.record = "";
              this.item = "";
              this.record = data.Results;
              this.item = data.TotalResult;
              this.length = this.item;
              this.pager = this.pagerService.getPager(this.item, page,this.pageSize);
            },
            error => {
              this.search = true;
              this.datashow = true;
              this.record.splice(0, this.record.length);
              this.length = 0;
            });

        })
    }
  }
  page(pageSize) {
    if (pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      this.onSubmit(1);
    }
    else {
      console.log()
      delete this.pageSize;
      console.log(this.pageSize)
    }
  }
  
  onPaginateChange(page: number) {
    this.endRequest = this._serv.searchrfprecord(this.Rfpnum, this.title, this.status, this.postedDate, this.DueDate, this.states, this.agencies, this.cates, this.pageSize, page).subscribe(
      data => {
        this.record = data.Results;
        this.item = data.TotalResult;
        this.length = this.item;
        this.pager = this.pagerService.getPager(this.item, page,this.pageSize);
      },
      error => {
      });
  }
  formclear() {
    this.status = "active";
    this.enterdate = null;
    this.duedate = null;
    this.states = undefined;
    this.agencies = undefined;
    this.cates = undefined;
    this.search = false;
    
   this.postedDate = null;
   this.DueDate =null;
  }
  single(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  query;
  Rfp;
  loaded = false;
  fund(event) {
    console.log(this.query)
    this._shareData.catInfo(this.query);
    let requiredUrl = 'searched-data'
    this._nav.navigate([requiredUrl], { queryParams: { keyword: this.query } });
  }
  triggerMike() {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('please upgrade');
    } else {
      this.blink = true;
      this.search1();
    }
  }
  /////////voice to text/////////
  search1(): void {
    this.speech.record().subscribe((text) => {
      this.query = text;
      this.blink = false;
      this.spokenText.emit(this.query);
      this.speech.stop();
    },
    );
  }
  filter(query) {
    if (this.query !== "") {
      this._serv1.searchSuggestions(this.query).subscribe(response => {
        this.Rfp = response.results;
        // console.log(this.Rfp);
        this.loaded = true;
      });
    }
  }
  ngOnInit() {
    // this.onPaginateChange(1);
    this.onSubmit(1);
    this.endRequest = this._serv.rfpstate().subscribe(
      data => {
        this.state = data.Result;
      },
      error => {
        // console.log(error);
      });
    this.endRequest = this._serv.rfpcategory().subscribe(
      data => {
        this.cat = data;
      },
      error => {
        // console.log(error);
      }
    )
    this.endRequest = this._serv.rfpagency().subscribe(
      data => {
        this.agency = data.Result;
      }
    )
    this.check_login();
    $("#box").click(function () {
      $("#box").toggleClass("animation-blink");
    });

  }
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      this.endRequest = this._serv.usersubscribe(this.uname).subscribe(
        data => {
          // console.log(data.Response);
          if (data.Response == "Subscribe user") {
            this.subscribe = data.Response
            return false
          }
        },
        error => {
          // console.log(error);
        });
    }
    else {
      return true
    }
  }
  ngOnDestroy() {
    // this.endRequest.unsubscribe();
  }
}