import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

/** Services */
import { DishService } from '../../services/dish.service';
import { ProcessHttpMessageService } from '../../services/process-http-message.service';

/** Router */
import { MenuPageRoutingModule } from './menu-routing.module';

/** Page Components */
import { MenuPage } from './menu.page';

/** Base URL - BackEnd Server (It is a recommended practice) */
import { BASE_URL } from '../../shared/baseurl';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage],
  providers: [
    DishService,
    ProcessHttpMessageService,
    {
        provide: 'BaseURL',
        useValue: BASE_URL
    }
  ]
})
export class MenuPageModule {}
