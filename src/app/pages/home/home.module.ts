import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

/** Services */
import { DishService } from '../../services/dish.service';
import { PromotionService } from '../../services/promotion.service';
import { LeaderService } from '../../services/leader.service';
import { ProcessHttpMessageService } from '../../services/process-http-message.service';

/** Router */
import { HomePageRoutingModule } from './home-routing.module';

/** Page Components */
import { HomePage } from './home.page';

/** Base URL - BackEnd Server (It is a recommended practice) */
import { BASE_URL } from '../../shared/baseurl';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    ProcessHttpMessageService,
    {
        provide: 'BaseURL',
        useValue: BASE_URL
    }
  ]
})
export class HomePageModule {}
