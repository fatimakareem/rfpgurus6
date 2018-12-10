import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { PagerService } from '../rfps/rfp/paginator.service';
import * as moment from 'moment';
import { AdvanceService } from '../advance-search/advance.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  providers: [PagerService, AdvanceService]
})
export class BaseComponent implements OnInit {
  data;
  state;
  pager: any = {};
  onUserRowSelect(event): void {
    this.data = event.data.seoTitleUrl;
    console.log(this.data);
    let sth = 'rfp/' + this.data;
    this._nav.navigate([sth]);
  }
  items;
  public cat = [];
  pageSize = '20';
  settings: any;
  duedate;
  enterdate;
  states;
  cates;
  title;
  Rfpnum;
  status;
  agencies;
  item;
  length;
  search = false;
  constructor(private route: ActivatedRoute, private _adserv: AdvanceService, private pagerService: PagerService, private http: Http, private _nav: Router) {
  }
  ngOnInit() {
    // this.setpage(1);
    this.onPaginateChange(1);
    this._adserv.rfpcategory().subscribe(
      data => {
        this.cat = data
      })
    this._adserv.rfpstate().subscribe(
      data => {
        this.state = data.Result
      })
  }
  singlerfp(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  page(pageSize) {
    if (pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      this.onPaginateChange(1);
    }
    else {
      console.log()
      delete this.pageSize;
      console.log(this.pageSize)
    }
  }
  setpage(page: number) {
  }
  onPaginateChange(page: number) {
    
    this.route.queryParams
      .subscribe(params => {
        console.log( params.enterdate)
        if (params.status || params.enterdate || params.duedate || params.state || params.agency || params.cat) {
          // alert(page)
          // this.status = params.status;
          // this.enterdate = new Date(params.enterdate);
          // this.duedate = new Date(params.duedate);
          // this.states = params.state;
          // this.agencies = params.agency;
          // this.cates = params.cat;
          this._adserv.searchrfprecord(this.Rfpnum, this.title, params.status, params.enterdate, params.duedate, params.state, params.agency, params.cat, this.pageSize, 1).subscribe(
            data => {
              this.items = data.Results;
              this.item = data.TotalResult;
              this.length = this.item;
              this.pager = this.pagerService.getPager(data['TotalResult'], page,this.pageSize);
              this.search = false;
            },
            error => {
              this.search = true;

              if (error.status == "400") {
                this.items.splice(0, this.items.length);
                this.length = 0;
                this.status = undefined;
                this.enterdate = undefined;
                this.duedate = undefined;
                this.states = undefined;
                this.agencies = undefined;
                this.cates = undefined;
              }
            });
        }else if (this.Rfpnum || this.title || this.states || this.cates || this.duedate || this.enterdate) {
          this._adserv.searchrfprecord(this.Rfpnum, this.title, this.status, this.enterdate, this.duedate, this.states, this.agencies, this.cates, this.pageSize, page).subscribe(
    
            data => {
              this.items = data.Results
              this.item = data.TotalResult;
              this.pager = this.pagerService.getPager(data['TotalResult'], page,this.pageSize);
              this.search = false;
            },
            error => {
              this.search = true;
              if (error.status == "400") {
                this.length = 0;
              }
            });
        }
        else {
      
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          this.http.get('https://devapis.rfpgurus.com/rf_p/rfp/date_entered/asc/' + this.pageSize + '?page=' + page, { headers: headers })
            .subscribe(Res => {
              this.items = Res.json()['results'];
              console.log(this.items, Res.json()['totalItems'], 'eee')
              this.pager = this.pagerService.getPager(Res.json()['totalItems'], page,this.pageSize);
              this.search = false;
            });
        }
      });
    
  }
}
