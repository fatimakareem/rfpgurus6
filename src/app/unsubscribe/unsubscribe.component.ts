import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Response, Http } from "@angular/http"
import { UnsubscribeService } from './unsubscribe.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss'],
 providers: [UnsubscribeService]
})
export class UnsubscribeComponent implements OnInit {
  sub;
  comment;
  constructor(private _serv: UnsubscribeService,
    private route: ActivatedRoute,
    private router: Router,
    private http5: Http) { }


  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   // console.log('params',params['query1'])
    //   this.fun(params['query1']);
    //   this.fun1(params['query1']);
    // });
  }
  email: any = [];
  available;
  fun() {

   this.route.params.subscribe(params => {
     this._serv.qurey(params['query1'],this.comment)
     .subscribe(
      data => {
    this._serv.unsub(params['query1'])
      .subscribe(
      data => {
        swal({
          type: 'success',
          title: 'UnSubScribed Successfully',
          showConfirmButton: false,
          timer: 2000
        })
        this.router.navigate(['/']);
        // if (this.email == "Alredy UnSubScribed") {
        //   swal({
        //     type: 'success',
        //     title: 'Alredy UnSubScribed',
        //     showConfirmButton: false,
        //     timer: 2000
        //   })
        //   this.router.navigate(['/']);
        // }
      })
      }
      );
    });
  }
  
}
