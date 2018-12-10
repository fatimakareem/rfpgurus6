import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SharedData } from '../../shared-service';
import { PagerService } from '../../rfps/rfp/paginator.service';
import { AllRfpsService } from './all-rfps.service';
declare const $: any;
@Component({
    selector: 'app-all-rfps',
    templateUrl: './all-rfps.component.html',
    styleUrls: ['./all-rfps.component.css'],
    providers: [PagerService, AllRfpsService, SharedData]
})
export class AllRfpsComponent implements OnInit {
    item;
    state;
    record: any = [];
    currentUser;
    length = 0;
    constructor(private pagerService: PagerService, public _shareData: SharedData, private _nav: Router, private _serv: AllRfpsService, private route: ActivatedRoute) { }
    // MatPaginator Inputs
    // length
    pageSize = "10";
    matpageSizeOptions = [10, 20, 35, 50];
    pager: any = {};
    end;
    status;
    local;
    uname;
    subscribe;
    // MatPaginator Output
    // pageEvent: PageEvent;
    // endRequest;
    // setPageSizeOptions(setPageSizeOptionsInput: string) {
    //     this.matpageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);

    // }
    page(pageSize) {
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
        this._serv.latestrfpecord(this.pageSize, page).subscribe(
            data => {

                this.record = data.results;
                this.item = data.totalItems;
                // this.length = this.item;
                console.log(this.record, 'jjjjjjjjjjjjjjj');
                console.log(data.totalItems);
                this.pager = this.pagerService.getPager(this.item, page,this.pageSize);
                console.log(this.pager)
            },
            error => {
                this.record.splice(0, this.record.length);
                //   console.log(error);
            });
    }
    download(info) {
        this._serv.downloadFile(info).subscribe(
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
    ngOnInit() {
        this.setPage(1);
        this.check_login()
    }
    single(query) {
        let sth = 'rfp/' + query;
        this._nav.navigate([sth]);
    }
    paginator(pageEvent) { }
    check_login() {
        if (localStorage.getItem('currentUser')) {
            this.local = localStorage.getItem('currentUser');
            let pars = JSON.parse(this.local);
            this.uname = pars.username
            this._serv.usersubscribe(this.uname).subscribe(
                data => {
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
}