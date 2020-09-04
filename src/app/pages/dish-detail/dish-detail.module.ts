import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

/** Services */
import { DishService } from '../../services/dish.service';
import { FavoriteService } from '../../services/favorite.service';
import { ProcessHttpMessageService } from '../../services/process-http-message.service';

/** Router */
import { DishDetailPageRoutingModule } from './dish-detail-routing.module';

/** Page Components */
import { DishDetailPage } from './dish-detail.page';

/** Base URL - BackEnd Server (It is a recommended practice) */
import { BASE_URL } from '../../shared/baseurl';

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
    DishService,
    FavoriteService,
    ProcessHttpMessageService,
    {
        provide: 'BaseURL',
        useValue: BASE_URL
    }
  ],
})
export class DishDetailPageModule {}
