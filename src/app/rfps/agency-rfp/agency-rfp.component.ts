import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import {Http ,Headers , Response} from '@angular/http';
import { AgencyService} from './agency.service';
import {MatPaginatorModule} from '@angular/material';
import {PageEvent} from '@angular/material';
import { Router, RouterModule } from '@angular/router';
import swal from 'sweetalert2';
import {SharedData } from '../../shared-service';
import {PagerService} from '../rfp/paginator.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
declare const $: any;
@Component({
  selector: 'app-agency-rfp',
  templateUrl: './agency-rfp.component.html',
  styleUrls: ['./agency-rfp.component.css'],
  
 providers: [PagerService,SharedData,AgencyService]
})
export class AgencyRfpComponent implements OnInit ,OnDestroy{
    item;
    agency;
    record:any = [] ;
    pageValues ;

    currentUser;

    constructor(private pagerService:PagerService,public _shareData: SharedData,private _nav:Router,private _serv: AgencyService ,private route: ActivatedRoute) { }
    // MatPaginator Inputs
    length = 0;
    pageSize = '50';
    pageSizeOptions = [10, 20, 35, 50];
    pager: any = {};  

    status;
    local;
    uname;
    subscribe;
    // MatPaginator Output
    pageEvent: PageEvent;
    endRequest;
    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
        // console.log(this.pageSizeOptions);
    }
    page(pageSize){
        if (pageSize) {
          console.log(pageSize);
          this.pageSize = pageSize;
          this.subscribe_data(1);
      }
      else {
          console.log()
          delete this.pageSize;
          console.log(this.pageSize)
      }
      }
    subscribe_data(page:number){
        this._shareData.returnagency().subscribe(
            data => {

                this.agency = data;
                console.log(data,"junaid");
                if(!data) {
                    this.route.queryParams
                        .subscribe(params => {
                            this.agency = params.agency
                        })
                }

                this.endRequest =   this._serv.staterecord(this.agency, this.pageSize, page).subscribe(
                    data => {
                        this.record = data.Results;
                        this.item = data.totalItems
                        this.length = this.item;
                        //  console.log(length);
                        //   console.log(data);
                        this.pager = this.pagerService.getPager(data['totalItems'], page,this.pageSize);
                    },
                    error => {
                        //   console.log(error);
                    });
            })
    }
    unsubscribe_data(){
        this._serv.unsub_staterecord(this.agency, this.pageSize, 1).subscribe(
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
        this.subscribe_data(1);
        // this.route.queryParams

        // .subscribe(params => {
        //   this.state = params.state
        //   console.log("junaid",params);

        // })
       

        this.check_login()
    }
    ngOnDestroy(){
        // this.endRequest.unsubscribe();
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
        this._serv.staterecord(this.agency, event.pageSize, event.pageIndex+1).subscribe(
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
