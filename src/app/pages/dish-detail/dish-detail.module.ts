import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DishDetailPageRoutingModule } from './dish-detail-routing.module';

import { DishDetailPage } from './dish-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DishDetailPageRoutingModule
  ],
  declarations: [DishDetailPage]
})
export class DishDetailPageModule {}
