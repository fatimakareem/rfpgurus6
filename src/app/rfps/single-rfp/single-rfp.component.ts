// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component , OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';
import {Http ,Headers , Response} from '@angular/http';
import { RfpService } from './rfp.service';
import swal from 'sweetalert2';
import 'rxjs/Rx' ;
import {SharedData } from '../../shared-service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'app/header/header.service';


@Component({
    selector: 'app-data-table-cmp',
    templateUrl: 'single-rfp.component.html'})

export class SingleRfpComponent implements OnInit  {
    rfpid:string;
    id;
    record=[];
    statuss;
    local;
    uname;
    subscribe;
    currentUser;
    wrfp;
    constructor(private _nav:Router,public _shareData: SharedData,private _http: Http,private route: ActivatedRoute,private _serv: RfpService) {
        
     }
  

    status: boolean = false;
    navbarClass(){
        this.status = !this.status;
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
            //  console.log("dsdasd");
         }
    } ,
    error=>{

    });
        }
    
    ngOnInit() {
        this._shareData.currentMessage.subscribe(message => this.wrfp = message)
        this._shareData.currentMessagetotal.subscribe(message => this.total = message)
        this.route.params
        .subscribe(params => {
        //   console.log(params); // {order: "popular"}
  
          this.rfpid = params['query'];
         
          this._serv.rfprecord(this.rfpid).subscribe(
              data => {
                  this.record = data;
                  this.id=data[0].id
                 
               
              },
              error => {
                //   console.log(error);
              });
        //   console.log(this.rfpid); // popular
        })

        this.check_login()
       
    }
total;
    watchlist(){
        if(localStorage.getItem('currentUser')){
        this._serv.postWatchlist(this.id).subscribe(
    
            data => {
             this.statuss=data.message;
             this.wrfp = data['result'];
            this.total=data.total
            console.log( data['result'],this.total)
        //  this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
        if(!data.message && data['result']){
            this._shareData.watchtotal(this.total); 
             this._shareData.watchInfo(this.wrfp);
            }
            if(this.statuss == "This Rfp is already in your Watch List"){
             swal({
                type: 'info',
                title: 'This RFP Is Already In Your Watchlist',
                showConfirmButton: true,
                confirmButtonColor: "#090200",
            });
        }
        else{
            swal({
                type: 'success',
                title: 'RFP succesfully added to your watch list',
                showConfirmButton: true,
                confirmButtonColor: "#090200",
            });
        }
              
            },
            error => {
              // console.log(error);
            });
        }
        else{
            swal({
                type: 'error',
                title: 'Please Login with RFPGurus',
                showConfirmButton: true,
                confirmButtonColor: "#090200",
            }); 
            // this._nav.navigate(['login']);
        }
       
       
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
