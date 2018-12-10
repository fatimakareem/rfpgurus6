import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AllStateService } from './all-state.service';
import { SharedData } from '../../shared-service';
@Component({
  selector: 'app-all-state',
  templateUrl: './all-state.component.html',
  styleUrls: ['./all-state.component.css'],
  providers: [AllStateService, SharedData]
})
export class AllStateComponent implements OnInit, OnDestroy {
  endRequest;
  state: any = [];
  statesearch;
  loaded = false;
  public query: any;
  public Rfp: any;
  public selected: any;
  mainSearch = 0;
  constructor(public _shareData: SharedData, private _nav: Router, private _serv: AllStateService) {
    this.endRequest = this._serv.rfpstate().subscribe(
      data => {
        this.state = data.Result;
        console.log("state", this.state);
      },
      error => {
        // console.log(error);
      }
    )
  }
  singlestate(state) {
    this.endRequest = this._shareData.stateInfo(state);
    let sth = 'state';
    this._nav.navigate([sth], { queryParams: { state: state, } });
  }
  ngOnInit() {
  }
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
        // console.log(this.Rfp);
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
    // this.endRequest.unsubscribe();
  }
}
