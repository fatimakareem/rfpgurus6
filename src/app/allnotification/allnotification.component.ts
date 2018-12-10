import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { SharedData } from '../shared-service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-allnotification',
  templateUrl: './allnotification.component.html',
  styleUrls: ['./allnotification.component.scss'],
  providers: [HeaderService]
})
export class AllnotificationComponent implements OnInit {
  id;
  title;
  constructor(private _nav: Router, public _shareData: SharedData, private _serv: HeaderService, ) { }

  ngOnInit() {
    this.notification();
    this._shareData.notification.subscribe(message => this.notificate = message)
    this._shareData.unreadnotification.subscribe(message => this.unread = message)
  }
  get(id, title) {
    this.id = id;
    this.title = title
  }
  notificate;
  unread;
  total_notification;
  deletenofication(id) {
    this._serv.deletenotify(id).subscribe(
      data => {

        this.notification();
      },
      error => {
        // console.log(error);
      });
  }
  updatenofication(id) {
    this._serv.Updatenotify(id).subscribe(
      data => {
        this.notification();
      },
      error => {
        // console.log(error);
      });
  }
  single(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  notification() {
    this._serv.notify().subscribe(
      data => {
        this.notificate = data['notifications'];
        this.unread = data.unread;
        this._shareData.notifyInfo(this.notificate);
        this._shareData.unreadnotifyInfo(this.unread);
        console.log(data.unread);
      },
      error => {
      });
  }
  deleteallnotification() {
    this._serv.deleteallnotify().subscribe(
      data => {
        swal({
          type: 'success',
          title: 'All Notifications Successfully Deleted.',
          showConfirmButton: false,
          timer: 2500
        });
        this.notification()
      },
      error => {
      });
  }
}
