import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

    constructor(
        private modalController: ModalController
    ) { }

    ngOnInit() {
    }

    dismissModal() {
        this .modalController .dismiss();
    }

}
