import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
    /** Atributes */
    reservationForm: FormGroup;

    constructor(
        private modalController: ModalController,
        private fb: FormBuilder
    ) { 
        this .createForm();
    }

    ngOnInit() {
    }

    createForm() {
        /** Define State Form (Add Form Validation) */
        this .reservationForm = this .fb .group({
            guests: 3,
            smoking: false,
            dateTime: [ '', Validators .required ],
        });
    }

    dismissModal() {
        this .modalController .dismiss();
    }

    onSubmit() {
        console .log( 'onSubmit', this .reservationForm .value );
        this .modalController .dismiss();
    }

}
