import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationPageRoutingModule } from './reservation-routing.module';

import { ReservationPage } from './reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReservationPageRoutingModule
  ],
  declarations: [ReservationPage]
})
export class ReservationPageModule {}
