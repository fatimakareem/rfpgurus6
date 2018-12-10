import { Component } from '@angular/core';
import { FooterService } from './footer.service';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
    selector: 'app-footer-cmp',
    templateUrl: 'footer.component.html'
})
export class FooterComponent {
    test: Date = new Date();
    constructor(private formBuilder: FormBuilder,private _serv: FooterService) { }
    // form;
    form = new FormGroup({
        email: new FormControl("", Validators.compose([Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ]))
    })
    ngOnInit() {
        // this.form = this.formBuilder.group({
        //     email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
        //     email: new FormControl("", Validators.compose([Validators.required,
        //         Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        //     ]))
        // });
    }
    onSubmit(email) {
        this._serv.subcribe(email).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'Successfully subscribed!',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error => {
                swal(
                    'Sorry',
                    'You already subscribed!',
                    'error'
                )
            })
    }
}