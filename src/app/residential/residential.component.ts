import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'dialog-overview-example',
    templateUrl: 'residential.component.html',
    styleUrls: ['./residential.component.css']
})

export class DialogOverviewExample {

    animal: string;
    name: string;

    constructor(public dialog: MatDialog) {
    }
}


