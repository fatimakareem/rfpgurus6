import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import {Http ,Headers , Response} from '@angular/http';
import { StateService } from './state.service';
import {MatPaginatorModule} from '@angular/material';
import {PageEvent} from '@angular/material';
import { Router, RouterModule } from '@angular/router';
import swal from 'sweetalert2';
import {SharedData} from '../../shared-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import {PagerService} from '../rfp/paginator.service';
import {isEmpty} from 'rxjs/operator/isEmpty';
declare const $: any;

@Component({
  selector: 'app-state-rfp',
  templateUrl: './state-rfp.component.html',
  styleUrls: ['./state-rfp.component.css'],
 providers: [PagerService,SharedData,StateService]
})
export class StateRfpComponent implements OnInit ,OnDestroy{
  item;
  state;
  record:any = [] ;
  pageValues ;
    pager: any = {};
    pageSizeOptions;
  currentUser;
  
  constructor(private pagerService:PagerService,public _shareData: SharedData,private _nav:Router,private _serv: StateService ,private route: ActivatedRoute) { }
  // MatPaginator Inputs
  length = 0;
  pageSize = '50';
  matpageSizeOptions = [10, 20, 35, 50];

    status;
  local;
  uname;
  subscribe;
  // MatPaginator Output
  pageEvent: PageEvent;
  endRequest;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.matpageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    // console.log(this.pageSizeOptions);
  }

subscribe_data(){
   this._serv.staterecord(this.state, this.pageSize, 1).subscribe(
          data => {
              this.record = data.Results;
             this.item = data.totalItems
             this.length = this.item;
            //  console.log(length);
            //   console.log(data);
          },
          error => {
            //   console.log(error);
          });
}
page(pageSize){
  if (pageSize) {
    console.log(pageSize);
    this.pageSize = pageSize;
    this.setPage(1);
}
else {
    console.log()
    delete this.pageSize;
    console.log(this.pageSize)
}
}
    setPage(page: number) {
      this.route.queryParams
    
      .subscribe(params => {
        this.state = params.state
    
        this.endRequest = this._serv.staterecord(this.state,this.pageSize, page).subscribe(
            data => {
                this.record = data.Results;
                this.item = data.totalItems
                this.length = this.item;
                this.pager = this.pagerService.getPager(this.item, page,this.pageSize);

                //  console.log(length);
                //   console.log(data);
            },
            error => {
                //   console.log(error);
            });})
    }
unsubscribe_data(){
 this._serv.unsub_staterecord(this.state, this.pageSize, 1).subscribe(
          data => {
              this.record = data.Results;
             this.item = data.totalItems
             this.length = this.item;
            //  console.log(length);
            //   console.log(data);
          },
          error => {
            //   console.log(error);
          });
}
      
download(info){
//   console.log(info);
  this._serv.downloadFile(info).subscribe(
      data =>{
           if(data.status ="200"){
              swal(
                  'File Downloaded Successfully!',
                  '',
                  'success'
                )
            //    console.log("dsdasd");
           }
      } ,
      error=>{
  
      });
          }

  ngOnInit() {
this.setPage(1);
    // this.route.queryParams
    
    // .subscribe(params => {
    //   this.state = params.state
    //   console.log("junaid",params);

    // })
    this._shareData.returnState().subscribe(
      data => {
      this.state = data;
      console.log("data",data)
      if(!data) {
          this.route.queryParams
              .subscribe(params => {
                  this.state = params.state
              })
      }
      // this.endRequest =  this._serv.staterecord(this.state, this.pageSize, 1).subscribe(
        
      //     data => {
      //         this.record = data.Results;
      //        this.item = data.totalItems
      //         this.pager = this.pagerService.getPager(data.totalItems, 1, 10);
      //        this.length = this.item;
      //        console.log("junaid",this.record);
      //     },
      //     error => {
      //       //   console.log(error);
      //     });
     })
  
    this.check_login()
  }
  ngOnDestroy(){
  this.endRequest.unsubscribe();
  }
  single(query){
    let sth = 'rfp/'+query;
    this._nav.navigate([sth]);
  }
  paginator(pageEvent) {
    
    // console.log(pageEvent)
    
    // this._serv.staterecord(this.state, this.pageEvent.pageSize, this.pageEvent.pageIndex).subscribe(
    //   data => {
    //       this.record = data.Results;
    //      this.item = data.totalItems
    //      this.length = this.item;
    //      console.log(length);
    //       console.log(data);
    //   },
    //   error => { 
    //       console.log(error);
    //   });
     
  }
  onPaginateChange(event){
     const startIndex = event.pageIndex * event.pageSize;
        //   console.log(event);
          this._serv.staterecord(this.state, event.pageSize, event.pageIndex+1).subscribe(
      data => {
          this.record = data.Results;
         this.item = data.totalItems
         this.length = this.item;
        //  console.log(length);
        //   console.log(data);
      },
      error => {
        //   console.log(error);
      });
  }
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
     let pars = JSON.parse(this.local) ;
     this.uname = pars.username
    this._serv.usersubscribe(this.uname).subscribe(
        data =>{
        //   console.log(data.Response);
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
