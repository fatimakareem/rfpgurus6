import { Component, OnInit, AfterContentInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { NgForm } from '@angular/forms'
import { Meta } from '@angular/platform-browser';
import { SharedData } from './../shared-service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('openModal') openModal: ElementRef;
  endRequest;
  loaded = false;
  CategoryCheck = false;
  public query: any;
  public Rfp: any;
  public selected: any;
  state: any = [];
  cat: any = [];
  category;
  item;
  posted = '';
  enter;
  record: any = [];
  local;
  uname;
  subscribe;
  search: boolean = false;
  enterdate;
  duedate;
  states;
  cates;
  status;
  dict_state = {
    "AL": "Alabama", "AK": "Alaska", "AS": "American Samoa", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District Of Columbia", "FM": "Federated States Of Micronesia", "FL": "Florida", "GA": "Georgia", "GU": "Guam", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa",
    "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MH": "Marshall Islands", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi",
    "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "MP": "Northern Mariana Islands", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PW": "Palau", "PA": "Pennsylvania", "PR": "Puerto Rico", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VI": "Virgin Islands", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"
  }
  constructor(public _shareData: SharedData, private _serv: HomeService, private _nav: Router, private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'Find thousands of active US and Canada government RFPs bids sites & contracts. RFP advantage, receive new bids, provide Government RFP Request for Proposal. Also, you can find Federal bids.' });
    this.meta.addTag({ name: 'author', content: 'RFPGurus' });
    this.meta.addTag({ name: 'keywords', content: 'government rfp, RFP, request for proposal, RFPs, RFQ, RFP database, RFP web site, RFP website, RFP search, request for proposals, government rfps, government RFPs, government, RFP notification, rfp finder, RFI, RFT, government contracts, federal contracts, state contracts, local contracts, government contracting, contract opportunities, government bids, government bids, federal bids, state bids, local bids, bid alert' });
  }
  getState(event) {
    this.states = event['state-abbr']
    console.log(event, this.states, this.dict_state[this.states])
    let searchUrl = 'advanced-search';
    this._nav.navigate([searchUrl], { queryParams: { state: this.dict_state[this.states] } });
  }
  onSubmit(F: NgForm) {
    let searchUrl = 'advanced-search';
    this._nav.navigate([searchUrl], { queryParams: { status: this.status, enterdate: this.enterdate, duedate: this.duedate, state: this.states, cat: this.cates } });
  }
  catrfp(cat) {
    this.endRequest = this._shareData.categoryInfo(cat);
    let sth = 'category';
    this._nav.navigate([sth], { queryParams: { cat: cat } });
  }
  public carouselOne: NgxCarousel;
  public carouselTwo: NgxCarousel;
  public carouselThree: NgxCarousel;
  public carouselFour: NgxCarousel;
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
  singlerfp(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  select(item) {
    this.selected = item;
    this.mainSearch = 0;
    this.query = '';
    this.Rfp = '';
  }
  stateInfo(state) {
    this.endRequest = this._shareData.stateInfo(state);
    let sth = 'state';
    this._nav.navigate([sth], { queryParams: { state: state, } });
  }
  ngOnInit() {
    setTimeout(() => {
      this.openModal.nativeElement.click();
    },
      20000);
    this.subscriber();
  }
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username;
      return true;
    } else {
      return false;
    }
  }
  catRfp(item) {
    console.log("junaid", item);
    this.endRequest = this._shareData.categoryInfo(item);
    let sth = 'category';
    this._nav.navigate([sth], { queryParams: { cat: item } });
  }
  ngAfterContentInit() {
    this.endRequest = this._serv.rfpstate().subscribe(
      data => {
        this.state = data.Result;
        console.log("state", this.state);
      },
      error => {
      });
    this.endRequest = this._serv.rfpcategory().subscribe(
      data => {
        this.cat = data;
        this.CategorySlider();
        this.CategoryCheck = true;
        console.log(data);
      },
      error => {
      }
    );
    this.endRequest = this._serv.latestrfps().subscribe(
      data => {
        this.record = data.results;
        console.log(data);
      },
      error => {
      }
    )
    this.carouselOne = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 1000,
      interval: 6500,
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner',
      easing: 'ease'
    };
    this.carouselTwo = {
      grid: { xs: 1, sm: 2, md: 3, lg: 4, all: 0 },
      slide: 3,
      speed: 400,
      interval: 2000,
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      loop: false,
      custom: 'banner',
      easing: 'ease'
    };
    this.carouselThree = {
      grid: { xs: 2, sm: 4, md: 5, lg: 7, all: 0 },
      slide: 1,
      speed: 400,
      interval: 3000,
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      loop: false,
      custom: 'banner',
      easing: 'ease'
    };
    this.carouselFour = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 3000,
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner',
      easing: 'ease'
    }
  }
  single(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
  }
  CategorySlider() {
    $('.CategorySlider').fadeOut(0);
    setTimeout(function () {
      $('.CategorySlider').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 3,
        autoplay: false,
        prevArrow: '<button class="leftRsBanner">&lt;</button>',
        nextArrow: '<button class="rightRsBanner">&lt;</button>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 5,
              infinite: true
            }
          },
          {
            breakpoint: 778,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 639,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }, 100);
    $('.CategorySlider').fadeIn(500).delay(200);
  }
  subscriber() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      this.endRequest = this._serv.usersubscribe(this.uname).subscribe(
        data => {
          if (data.Response == "Subscribe user") {
            this.subscribe = data.Response
            return false
          }
        },
        error => {
        });
    }
    else {
      return true
    }
  }
  ngOnDestroy() {
    $('#exampleModalCenter').modal('hide');
  }
}