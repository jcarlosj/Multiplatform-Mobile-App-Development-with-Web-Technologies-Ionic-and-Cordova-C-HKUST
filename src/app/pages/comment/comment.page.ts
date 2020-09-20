import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

    constructor(
        private modalController: ModalController,
    ) { }

    ngOnInit() {
    }

    dismissModal() {
        this .modalController .dismiss();
    }

}
