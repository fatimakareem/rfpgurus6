import { Component, OnInit } from '@angular/core';
import {NgxCarousel} from 'ngx-carousel';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  constructor() { }
    public clientCarousel: NgxCarousel;
  ngOnInit() {
      this.clientCarousel = {
          grid: {xs: 1, sm: 3, md: 4, lg: 5, all: 0},
          slide: 1,
          speed: 500,
          interval: 2000,
          point: {
              visible: false
          },
          load: 2,
          touch: true,
          loop: true,
          custom: 'banner',
          easing: 'ease'
      };
  }
    public myfunc(event: Event) {
        // carouselLoad will trigger this funnction when your load value reaches
        // it is helps to load the data by parts to increase the performance of the app
        // must use feature to all carousel
    }
}
