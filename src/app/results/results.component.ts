import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import {PageEvent} from '@angular/material';
import { Router} from '@angular/router';
import swal from 'sweetalert2';
import {SharedData } from './../shared-service';
import {ResultsService} from './results.service';
import {PagerService} from '../rfps/rfp/paginator.service';

declare const $: any;


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [PagerService]
})

export class ResultsComponent implements OnInit,OnDestroy {

    item;
    cat;
    record:any = [] ;
    status;
    local;
    uname;
    subscribe;
    sorted;
    constructor(private pagerService:PagerService,public _shareData: SharedData,private _nav:Router,private _serv: ResultsService ,private route: ActivatedRoute) { }
    // MatPaginator Inputs
    endRequest;
    length = 0;
    pager: any = {};  

    pageSize = '20';
    pageSizeOptions = [10, 20, 35, 50];

    // MatPaginator Output
    pageEvent: PageEvent;

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
        // console.log(this.pageSizeOptions);
    }



    download(info){
        console.log(info);
       this.endRequest= this._serv.downloadFile(info).subscribe(
            data =>{
                if(data.status ="200"){
                    swal(
                        'File Downloaded Successfully!',
                        '',
                        'success'
                    )
                    //  console.log("dsdasd");
                }
            } ,
            error=>{

            });
    }
    order="asc"
    sort(sorted,page){
        this.route.queryParams
        .subscribe(params => {
            this.cat = params.keyword
        console.log(sorted)
        this._serv.sortby(sorted, this.order,this.cat,page,this.pageSize).subscribe(
            data => {
                this.record = data.results;
                console.log(data.results)
                this.item = data.totalItems
                this.pager = this.pagerService.getPager(data['totalItems'], page,this.pageSize);
            })
        })
    }
    ngOnInit() {
        this.onPaginateChange(1);
       
        this.check_login()
    }
    page(pageSize){
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
    onPaginateChange(page:number) {
        // this.route.params
        // .subscribe(params => {
          
        // //   console.log(params); // {order: "popular"}
  
        //   this.cat = params['query'];
        //   console.log(this.cat)
        this._shareData.returnCategory().subscribe(
            data => {
                this.cat = data;
       
            this.route.queryParams
                .subscribe(params => {
                    this.cat = params.keyword
               this.endRequest= this._serv.searchrfprecord(this.cat, this.pageSize,page).subscribe(
                    data => {
                        this.record = data.results;
                        this.pager = this.pagerService.getPager(data['totalItems'], page,this.pageSize);
                       this.endRequest= this._serv.toalsearchrecord(this.cat).subscribe(
                            data => {
                                this.item = data.totalItems
                                this.length = this.item;

                            })

                    },
                    error => {
                        console.log(error);
                    })
            })
        // const startIndex = event.pageIndex * event.pageSize;
    //    this.endRequest= this._serv.searchrfprecord(this.cat, this.pageSize, page).subscribe(
    //         data => {
    //             this.record = data.results;
    //         this.pager = this.pagerService.getPager(data['totalItems'], page);
    //         },
    //         error => {
    //             // console.log(error);
    //         });
        })
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
           this.endRequest= this._serv.usersubscribe(this.uname).subscribe(
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
    ngOnDestroy(){
        // this.endRequest.unsubscribe();
    }
}
