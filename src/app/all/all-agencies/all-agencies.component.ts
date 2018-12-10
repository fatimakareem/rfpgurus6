import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AllAgenciesService } from './all-agencies.service';
import { SharedData } from '../../shared-service';
@Component({
    selector: 'app-agencies',
    templateUrl: './all-agencies.component.html',
    styleUrls: ['./all-agencies.component.css'],
    providers: [AllAgenciesService, SharedData]
})
export class AllAgenciesComponent implements OnInit, OnDestroy {
    endRequest;
    agency: any = [];
    agensearch;
    loaded = false;
    public query: any;
    public Rfp: any;
    public selected: any;
    constructor(public _shareData: SharedData, private _nav: Router, private _serv: AllAgenciesService) {
        this.endRequest = this._serv.rfpagency().subscribe(
            data => {
                this.agency = data.Result;
                console.log("agency", this.agency);
            },
            error => {
            }
        )
    }
    singleagency(agency) {
        this.endRequest = this._shareData.agencyInfo(agency);
        let sth = 'agency';
        this._nav.navigate([sth], { queryParams: { agency: agency, } });
    }
    ngOnInit() {
    }
    mainSearch = 0;
    closeSearch() {
        if (this.mainSearch == 1) {
            this.mainSearch = 0;
            this.query = '';
            this.Rfp = '';
        }
    }
    focusInput() {
        if (this.mainSearch == 1) {
            let inputField: HTMLElement = <HTMLElement>document.querySelectorAll('.search-holder input')[0];
            inputField.focus();
        }
    }
    openSearch(): void {
        this.mainSearch = 1;
        setTimeout(this.focusInput(), 5000);
    }
    filter(query) {
        if (this.query !== "") {
            this.endRequest = this._serv.searchrecord(this.query).subscribe(response => {
                this.Rfp = response.results;
                this.loaded = true;
            });
        }
    }
    select(item) {
        this.selected = item;
        this.mainSearch = 0;
        this.query = '';
        this.Rfp = '';
    }
    singlerfp(id, num) {
        let sth = 'single-rfp';
        this._nav.navigate([sth], { queryParams: { id: id, rfp: num } });
    }
    ngOnDestroy() {
    }
}
