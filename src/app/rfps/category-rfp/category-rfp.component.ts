import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { CategoryRfpService } from './category-rfp.service';
import {PageEvent} from '@angular/material';
import { Router} from '@angular/router';
import swal from 'sweetalert2';
import {SharedData } from '../../shared-service';
declare const $: any;
import {PagerService} from '../rfp/paginator.service';


@Component({
  selector: 'app-category-rfp',
  templateUrl: './category-rfp.component.html',
  styleUrls: ['./category-rfp.component.css'],
  providers: [PagerService,SharedData,CategoryRfpService]
})
export class CategoryRfpComponent implements OnInit {

  item;
  cat;
  record:any = [] ;
    status;
  local;
  uname;
  subscribe;
  
  constructor(private pagerService:PagerService,public _shareData: SharedData,private _nav:Router,private _serv: CategoryRfpService ,private route: ActivatedRoute) { }
  // MatPaginator Inputs
  length = 0;
  pageSize = '50';
  pageSizeOptions = [10, 20, 35, 50];
  pager: any = {};  

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
 


  download(info){
    console.log(info);
    this._serv.downloadFile(info).subscribe(
        data =>{
             if(data.status ="200"){
                swal(
                    'File Downloaded Successfully!',
                    '',
                    'success'
                  )
             }
        } ,
        error=>{
    
        });
            }

  ngOnInit() {
    this.setpage(1);
    this.check_login()
  }
setpage(page:number){
  // this._shareData.returnCategory().subscribe(
  //   data => {
  //     this.cat = data;
  //       if(!data) {
            this.route.queryParams
                .subscribe(params => {
                    this.cat = params.cat
        //         })
        // }
  this._serv.catrfprecord(this.cat, this.pageSize,page).subscribe(
      data => {
          this.record = data.Results;
         this.item = data.totalItems
         this.length = this.item;
         this.pager = this.pagerService.getPager(data['totalItems'], page,this.pageSize);
      },
      error => {
          console.log(error);
      });
})
}
  onPaginateChange(event) {
    const startIndex = event.pageIndex * event.pageSize;    
    this._serv.catrfprecord(this.cat, event.pageSize, event.pageIndex+1).subscribe(
      data => {
          this.record = data.Results;
         this.item = data.totalItems
         this.length = this.item;
      },
      error => {
          // console.log(error);
      });
  }
  single(query){
    let sth = 'rfp/'+query;
    this._nav.navigate([sth]);
  }
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
     let pars = JSON.parse(this.local) ;
     this.uname = pars.username
    this._serv.usersubscribe(this.uname).subscribe(
        data =>{
          if(data.Response == "Subscribe user"){
             this.subscribe = data.Response
            return false
          }
        },
        error =>{
        // console.log(error);
        });
     
    }
    else {
      return true
    }
  }
}
