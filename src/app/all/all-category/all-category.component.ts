import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AllCategoryService } from './all-category.service';
import { SharedData } from '../../shared-service';
@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css'],
  providers: [AllCategoryService, SharedData]
})
export class AllCategoryComponent implements OnInit, OnDestroy {
  endRequest;
  cat: any = [];
  catsearch;
  loaded = false;
  public query: any;
  public Rfp: any;
  public selected: any;
  mainSearch = 0;
  constructor(public _shareData: SharedData, private _nav: Router, private _serv: AllCategoryService) {
    this.endRequest = this._serv.rfpcategory().subscribe(
      data => {
        this.cat = data;
      },
      error => {
      }
    )
  }
  catrfp(cat) {
    this.endRequest = this._shareData.categoryInfo(cat);
    let sth = 'category';
    this._nav.navigate([sth], { queryParams: { cat: cat } });
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
