import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { DishDetailPageRoutingModule } from './dish-detail-routing.module';

import { DishDetailPage } from './dish-detail.page';

import { FavoriteService } from '../../services/favorite.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    DishDetailPageRoutingModule
  ],
  declarations: [DishDetailPage],
  providers: [
    FavoriteService
  ],
})
export class DishDetailPageModule {}
