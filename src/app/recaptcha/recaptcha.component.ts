import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import 'rxjs/add/observable/interval';
@Component({
  selector: 'blackgeeks-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})
export class RecaptchaComponent implements OnInit {
  public recaptchaString = '';
  public enterText = '';
  private imagesList = [
    'assets/images/1.png',
    'assets/images/2.png',
    'assets/images/3.png',
    'assets/images/4.png',
    'assets/images/5.png',
    'assets/images/6.png',
    'assets/images/7.png',
    'assets/images/8.png',
    'assets/images/9.png',
    'assets/images/10.png',
    'assets/images/11.png',
    'assets/images/12.png',
    'assets/images/13.png',
    'assets/images/14.png',
    'assets/images/15.png',
    'assets/images/16.png',
    'assets/images/17.png',
    'assets/images/18.png',
    'assets/images/19.png',
    'assets/images/20.png',
    'assets/images/21.png',
    'assets/images/22.png',
    'assets/images/23.png',
    'assets/images/24.png',
    'assets/images/25.png',
  ];
  constructor(@Inject(PLATFORM_ID) public platformId: Object) {
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.reset();
      // Observable.interval(5000).subscribe(() => {
      //   this.reset();
      // });
    }
  }
  private makeid() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  public reset() {
    this.recaptchaString = this.makeid();
    this.enterText = '';
    let element = document.getElementById('text-wrapper');
    // let iterateList = [].slice.call(elementList);
    // for (let element of iterateList) {
    element.setAttribute("style", "background-image: url(" + this.imagesList[Math.floor(Math.random() * this.imagesList.length)] + ");")
    // element['style'].backgroundImage = this.imagesList[Math.floor(Math.random() * this.imagesList.length)];
    // }
    console.log(element);
    return this.recaptchaString;
  }
  public getResponse() {
    if (this.recaptchaString === this.enterText) {
      this.reset();
      return true;
    } else {
      this.reset();
      return false;
    }
  }
}
