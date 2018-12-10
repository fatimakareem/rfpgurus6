import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/platform-browser';
declare var $: any;

@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    // siteKey = '6Lebrk8UAAAAAFt6cq9isv1EzTIXN6wgrC8Drbwy';
    // secretKey = '6Lebrk8UAAAAAJDD-gFnna3WtX6-ZKFtDC1dE1Te';
    
    private _router: Subscription;
    time;
    constructor( private router: Router, @Inject(DOCUMENT,) private document: any) {}
   
    ngOnInit() {
        this.time=new Date()
        // setTimeout(function(){localStorage.removeItem("currentUser");}, 1000*60);
        if(localStorage.getItem("exp") == this.time){
            localStorage.clear();
        }
        $.material.options.autofill = true;
        $.material.init();
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            }else{
                window.document.activeElement.scrollTop = 0;
            }
        });
       
        window.onbeforeunload = function () {
            $(this).scrollTop(0);
          }
        //   .animate({ scrollTop: 0 }, 800);
    }
}